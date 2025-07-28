import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dataBase/schemas/user.schema';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { IUser } from 'src/domain/entities/user.entity';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    return new IUser(user._id!.toString(), user.email,user.name, user.password);
  }
  async create(user: IUser): Promise<IUser> {
    const createdUser = await this.userModel.create({
      name:user.name,
      email: user.email,
      password: user.password,
    });
    return new IUser(
      createdUser._id!.toString(),
      createdUser.email,
      createdUser.password,
      createdUser.name
    );
  }
}
