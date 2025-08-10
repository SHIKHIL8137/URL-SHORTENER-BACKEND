
import { RegisterUserDto } from "src/application/dto/register-user.dto";

export interface ILogin {
  execute( dto: RegisterUserDto):Promise<{ refreshToken: string; accessToken: string }>;
}