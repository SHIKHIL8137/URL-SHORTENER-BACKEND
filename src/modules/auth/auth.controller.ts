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
} from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import { AuthGuard, VerifyRefresh } from './auth.guard';
import { RefreshUseCase } from 'src/application/use-cases/auth/refresh.use-case';
import { GetUserUseCase } from 'src/application/use-cases/auth/getUser.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly getUserUseCase : GetUserUseCase
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto,@Response() res:any) {
    await this.registerUseCase.execute(dto)
    return res.status(200).json({message:"User created successfull",status:true});
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: RegisterUserDto, @Response() res: any) {
    const tokens = await this.loginUseCase.execute(dto);
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 15,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({status:true, message: 'Login successful' });
  }

  @Post('refresh')
  @UseGuards(VerifyRefresh)
  async accessToken(@Request() req: any, @Response() res: any) {
    const {accessToken} = await this.refreshUseCase.execute(req.user.email);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 15,
    });
    return res.status(200).json({ message: 'Token refreshed' });
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@Request() req: any, @Response() res: any) {
    const user = await this.getUserUseCase.execute(req.user.email);
    return res.status(200).json(user);
  }

  @Get('logout')
  async logout(@Response() res:any){
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      path: '/', 
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false,
      path: '/', 
    });
    return res.status(200).json({ status: true, message: 'Logout successful' });
  }
}
