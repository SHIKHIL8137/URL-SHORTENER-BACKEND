import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from '../schemas/url.schema';

export const UrlModel = MongooseModule.forFeature([
  { name: Url.name, schema: UrlSchema },
]);
