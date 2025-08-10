import { RegisterUserDto } from "src/application/dto/register-user.dto";

export interface IRegister{
  execute(dto:RegisterUserDto):Promise<{id:string,email:string}>
}