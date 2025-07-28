import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { UrlModule } from './modules/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseConfig.uri, mongooseConfig.options),
    AuthModule,
    UrlModule,
  ],
})
export class AppModule {}
