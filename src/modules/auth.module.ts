import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { RegisterUseCase } from 'src/application/use-cases/auth/register.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/infrastructure/dataBase/schemas/user.schema';
import { RefreshUseCase } from 'src/application/use-cases/auth/refresh.use-case';
import { GetUserUseCase } from 'src/application/use-cases/auth/getUser.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    RefreshUseCase,
    GetUserUseCase, 
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
   exports: ['UserRepository'],
})
export class AuthModule {}
