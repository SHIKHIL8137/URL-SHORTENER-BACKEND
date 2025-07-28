import { UserRepository } from '../../../domain/repositories/user.repository';
import { Inject, NotFoundException } from '@nestjs/common';

export class GetUserUseCase {
  constructor( @Inject('UserRepository') 
  private userRepository: UserRepository) {}

  async execute(
    email:string ,
  ): Promise<{email:string,name:string}|null> {
    const user = await this.userRepository.findByEmail(email);   
    if(!user){
      throw new NotFoundException('User not found')
    }
    return {
    email: user.email,
    name: user.name
  };
  }
}
