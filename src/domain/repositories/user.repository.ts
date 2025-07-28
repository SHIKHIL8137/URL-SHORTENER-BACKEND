import { IUser } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
}
