import { CreateUrlDto } from "src/application/dto/create-url.dto";
import { UrlResponseDto } from "src/domain/types/url.type";

export interface ICreate{
  execute(dto:CreateUrlDto,userId:string):Promise<UrlResponseDto>;
}