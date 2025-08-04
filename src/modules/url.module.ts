import { Module } from '@nestjs/common';
import { UrlController } from './url/url.controller';
import { CreateUrlUseCase } from 'src/application/use-cases/url/create-url.use-case';
import { GetUrlUseCase } from 'src/application/use-cases/url/get-url.use-case';
import { UrlRepositoryImpl } from 'src/infrastructure/repositories/url.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from 'src/infrastructure/dataBase/schemas/url.schema';
import { GetUrlsUseCase } from 'src/application/use-cases/url/get-urls-userId.usecases';
import { TimestampShortCodeGenerator } from 'src/infrastructure/utils/timestamp-shortcode-generator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }])],
  controllers: [UrlController],
  providers: [
    CreateUrlUseCase,
    GetUrlUseCase,
    GetUrlsUseCase,
    { provide: 'UrlRepository', useClass: UrlRepositoryImpl },
     { provide: 'ShortCodeGenerator', useClass: TimestampShortCodeGenerator },
  ],
   exports: ['UrlRepository'],
})
export class UrlModule {}
