import { IChangePassword } from "src/domain/types/user.type";

export class ChangePasswordDto implements IChangePassword {
  constructor(
    public currentPassword: string,
    public newPassword: string,
  ) {}
}
