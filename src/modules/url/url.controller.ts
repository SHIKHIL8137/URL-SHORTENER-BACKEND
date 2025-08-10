import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  Response,
  Query,
  Inject,
} from '@nestjs/common';
import { CreateUrlDto } from '../../application/dto/create-url.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ICreate } from 'src/domain/interfaces/url/ICreate-url.interface';
import { IGeturl } from 'src/domain/interfaces/url/IGet-url.interface';
import { IGeturls } from 'src/domain/interfaces/url/IGet-urls.interface';
import { messages } from 'src/utils/statusMessage';
import { statusCodes } from 'src/utils/statusCode';


@Controller('url')
export class UrlController {
  constructor(
    @Inject('ICreate')
    private readonly _createUrlUseCase: ICreate,
    @Inject('IGeturl')
    private readonly _getUrlUseCase: IGeturl,
    @Inject('IGeturls')
    private readonly _getUrlsUsecase: IGeturls,
  ) {}

  @Get(':shortCode')
  async get(@Param('shortCode') shortCode: string, @Response() res: any) {
    const urlEntry = await this._getUrlUseCase.execute(shortCode);
    if (!urlEntry?.originalUrl) {
      throw new Error(messages.NOT_FOUND);
    }
    return res.status(statusCodes.SUCCESS).json(urlEntry?.originalUrl);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async getUrlsByUserId(
    @Request() req: any,
    @Query('skip') skip = 0,
    @Query('limit') limit = 10,
  @Response() res:any) {
    const data = await this._getUrlsUsecase.execute(req.user.userId, skip, limit)
    return res.status(statusCodes.SUCCESS).json(data);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async create(@Body() dto: CreateUrlDto, @Request() req: any ,@Response() res:any) {
    const data = await this._createUrlUseCase.execute(dto, req.user.userId);
    return res.status(statusCodes.SUCCESS).json(data)
  }
}
