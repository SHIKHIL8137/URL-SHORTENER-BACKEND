import { IGetUser } from 'src/domain/interfaces/auth/IGetUser.interface';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Inject, NotFoundException } from '@nestjs/common';

export class GetUserUseCase implements IGetUser{
  constructor( @Inject('UserRepository') 
  private _userRepository: UserRepository) {}

  async execute(
    email:string ,
  ): Promise<{email:string,name:string}|null> {
    const user = await this._userRepository.findByEmail(email);   
    if(!user){
      throw new NotFoundException('User not found')
    }
    return {
    email: user.email,
    name: user.name
  };
  }
}
