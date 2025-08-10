import { ChangePasswordDto } from 'src/application/dto/password.dto';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IChangePassword } from 'src/domain/interfaces/auth/IChangePassword.interface';


export class ChangePasswordUseCase implements IChangePassword {
  constructor(
    @Inject('UserRepository')
    private _userRepository: UserRepository
  ) {}

  async execute(data: ChangePasswordDto, email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentPasswordHash = user.password || '';
    
    const isMatch = await bcrypt.compare(data.currentPassword, currentPasswordHash);
    
    if (!isMatch) {
      throw new UnauthorizedException('Invalid current password');
    }

    const newHashedPassword = await bcrypt.hash(data.newPassword, 10);

    await this._userRepository.updateUser({ password: newHashedPassword }, user.email);
  }
}
