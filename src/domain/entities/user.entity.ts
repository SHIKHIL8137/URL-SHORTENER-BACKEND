import { IUser } from "../types/user.type";

export class UserEntity implements IUser {
  constructor(
    public _id: string,
    public email: string,
    public name:string,
    public password: string,
    public role:string
  ) {}
}
