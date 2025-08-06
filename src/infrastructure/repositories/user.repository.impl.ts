import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dataBase/schemas/user.schema';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { IUser } from 'src/domain/types/user.type';
import { UserEntity } from 'src/domain/entities/user.entity';


export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this._userModel.findOne({ email }).exec();
    if (!user) return null;
    return new UserEntity(user._id!.toString(), user.email,user.name, user.password,user.role);
  }
  async create(user: IUser): Promise<IUser> {
    const createdUser = await this._userModel.create({
      name:user.name,
      email: user.email,
      password: user.password,
      role:user.role
    });
    return new UserEntity(
      createdUser._id!.toString(),
      createdUser.email,
      createdUser.password,
      createdUser.name,
      createdUser.role
    );
  }

async updateUser(data:Partial<IUser>,email:String): Promise<IUser | null> {
  const update = await this._userModel.updateOne(
    { email: email },
    { $set: data }
  );
  if (update.modifiedCount > 0) {
    return this._userModel.findOne({ email: email });
  } else {
    return null;
  }
}
}
