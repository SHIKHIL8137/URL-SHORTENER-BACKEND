import { ChangePasswordDto } from "src/application/dto/password.dto";

export interface IChangePassword {
  execute(data:ChangePasswordDto,email:String):Promise<void>;
}