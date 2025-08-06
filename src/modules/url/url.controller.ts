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
} from '@nestjs/common';
import { CreateUrlUseCase } from '../../application/use-cases/url/create-url.use-case';
import { GetUrlUseCase } from '../../application/use-cases/url/get-url.use-case';
import { CreateUrlDto } from '../../application/dto/create-url.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUrlsUseCase } from 'src/application/use-cases/url/get-urls-userId.usecases';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('url')
export class UrlController {
  constructor(
    private readonly _createUrlUseCase: CreateUrlUseCase,
    private readonly _getUrlUseCase: GetUrlUseCase,
    private readonly _getUrlsUsecase: GetUrlsUseCase,
  ) {}

  @Get(':shortCode')
  async get(@Param('shortCode') shortCode: string, @Response() res: any) {
    const urlEntry = await this._getUrlUseCase.execute(shortCode);
    if (!urlEntry?.originalUrl) {
      throw new Error('URL not found');
    }
    return res.json(urlEntry?.originalUrl);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async getUrlsByUserId(
    @Request() req: any,
    @Query('skip') skip = 0,
    @Query('limit') limit = 10,
  ) {
    return this._getUrlsUsecase.execute(req.user.userId, skip, limit);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async create(@Body() dto: CreateUrlDto, @Request() req: any) {
    return this._createUrlUseCase.execute(dto, req.user.userId);
  }
}
