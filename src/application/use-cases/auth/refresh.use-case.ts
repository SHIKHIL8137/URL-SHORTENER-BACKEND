import { UserRepository } from '../../../domain/repositories/user.repository';
import { RegisterUserDto } from 'src/application/dto/register-user.dto';
import * as jwt from 'jsonwebtoken';
import { accessTokenConfig } from 'src/config/jwt.config';
import { BadRequestException, Inject } from '@nestjs/common';

export class RefreshUseCase {
  constructor( @Inject('UserRepository') 
  private userRepository: UserRepository) {}

  async execute(
  email:string
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { userId: user._id ,email:user?.email},
      accessTokenConfig.secret,
      accessTokenConfig.signOptions,
    );
    return {accessToken };
  }
}
