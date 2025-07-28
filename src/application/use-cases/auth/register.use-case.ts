import { UserRepository } from '../../../domain/repositories/user.repository';
import { RegisterUserDto } from 'src/application/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/domain/entities/user.entity';
import { ConflictException, Inject } from '@nestjs/common';

export class RegisterUseCase {
  constructor(
    @Inject('UserRepository') 
    private readonly userRepository: UserRepository
  ) {}

  async execute(dto: RegisterUserDto): Promise<{ id: string; email: string }> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new IUser(
      Math.random().toString(36).substring(2),
      dto.email,
      dto.name,
      hashedPassword,  
    );


    const createdUser = await this.userRepository.create(user);
    return { id: createdUser._id, email: createdUser.email };
  }
}
