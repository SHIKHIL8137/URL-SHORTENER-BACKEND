import { UserRepository } from '../../../domain/repositories/user.repository';
import { RegisterUserDto } from 'src/application/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException, Inject } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';

export class RegisterUseCase {
  constructor(
    @Inject('UserRepository') 
    private readonly _userRepository: UserRepository
  ) {}

  async execute(dto: RegisterUserDto): Promise<{ id: string; email: string }> {
    const existingUser = await this._userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new UserEntity(
      Math.random().toString(36).substring(2),
      dto.email,
      dto.name,
      hashedPassword,
      dto.role  
    );


    const createdUser = await this._userRepository.create(user);
    return { id: createdUser._id, email: createdUser.email };
  }
}
