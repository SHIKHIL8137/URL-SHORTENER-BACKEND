import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Response,
  Get,
  Patch,
  Inject,
} from '@nestjs/common';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import { AuthGuard, VerifyRefresh } from './auth.guard';
import { ChangePasswordDto } from 'src/application/dto/password.dto';
import { RolesGuard } from './role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { IChangePassword } from 'src/domain/interfaces/auth/IChangePassword.interface';
import { IGetUser } from 'src/domain/interfaces/auth/IGetUser.interface';
import { IRefresh } from 'src/domain/interfaces/auth/IRefresh.interface';
import { ILogin } from 'src/domain/interfaces/auth/ILogin.interface';
import { IRegister } from 'src/domain/interfaces/auth/IRegister.interface';
import { statusCodes } from 'src/utils/statusCode';
import { messages } from 'src/utils/statusMessage';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IRegister')
    private readonly _registerUseCase: IRegister,
    @Inject('ILogin')
    private readonly _loginUseCase: ILogin,
    @Inject('IRefresh')
    private readonly _refreshUseCase: IRefresh,
    @Inject('IGetUser')
    private readonly _getUserUseCase: IGetUser,
    @Inject('IChangePassword')
    private readonly _changePassword: IChangePassword,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto, @Response() res: any) {
    await this._registerUseCase.execute(dto);
    return res
      .status(statusCodes.SUCCESS)
      .json({ message: messages.USER_CREATION_SUCCESS, status: true });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: RegisterUserDto, @Response() res: any) {
    const tokens = await this._loginUseCase.execute(dto);
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(statusCodes.SUCCESS).json({ status: true, message: messages.LOGIN });
  }

  @Post('refresh')
  @UseGuards(VerifyRefresh)
  async accessToken(@Request() req: any, @Response() res: any) {
    const { accessToken } = await this._refreshUseCase.execute(req.user.email);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15,
    });

    return res.status(statusCodes.SUCCESS).json({ message: messages.REFRESHED_TOKEN });
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@Request() req: any, @Response() res: any) {
    const user = await this._getUserUseCase.execute(req.user.email);
    return res.status(statusCodes.SUCCESS).json(user);
  }

  @Get('logout')
  async logout(@Response() res: any) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return res.status(statusCodes.SUCCESS).json({ status: true, message: messages?.LOGOUT });
  }

  @Patch('resetpassword')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async resetPassword(
    @Body() dto: ChangePasswordDto,
    @Response() res: any,
    @Request() req: any,
  ) {
    console.log(dto);
    console.log(req.user.email);
    await this._changePassword.execute(dto, req.user.email);
    return res.status(statusCodes.SUCCESS).json({ status: true, message: messages?.CHANGE_PASSWORD });
  }
}
