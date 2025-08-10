import { ChangePasswordDto } from "src/application/dto/password.dto";

export interface IGetUser {
  execute(email:String):Promise<{email:string,name:string}|null>;
}