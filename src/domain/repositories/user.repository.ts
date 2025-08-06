import { IUser } from "../types/user.type";


export interface UserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  updateUser(user:Partial<IUser>,email:string):Promise<IUser | null>;
}
