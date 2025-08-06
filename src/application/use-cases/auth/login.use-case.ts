import { UserRepository } from '../../../domain/repositories/user.repository';
import { RegisterUserDto } from 'src/application/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { accessTokenConfig, refreshTokenConfig } from 'src/config/jwt.config';
import { BadRequestException, Inject } from '@nestjs/common';

export class LoginUseCase {
  constructor( @Inject('UserRepository') 
  private _userRepository: UserRepository) {}

  async execute(
    dto: RegisterUserDto,
  ): Promise<{ refreshToken: string; accessToken: string }> {
    const user = await this._userRepository.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    const accessToken = jwt.sign(
      { userId: user._id,email:user?.email ,role:user?.role},
      accessTokenConfig.secret,
      accessTokenConfig.signOptions,
    );
    const refreshToken = jwt.sign(
      { userId: user._id,email:user?.email,role:user?.role },
      refreshTokenConfig.secret,
      refreshTokenConfig.signOptions,
    );
    return { accessToken, refreshToken };
  }
}
