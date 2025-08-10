import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { RegisterUseCase } from 'src/application/use-cases/auth/register.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/infrastructure/dataBase/schemas/user.schema';
import { RefreshUseCase } from 'src/application/use-cases/auth/refresh.use-case';
import { GetUserUseCase } from 'src/application/use-cases/auth/getUser.use-case';
import { ChangePasswordUseCase } from 'src/application/use-cases/auth/changePassword.usecase';
import { TOKENS } from 'src/common/constants/tokens';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [
    { provide: TOKENS.IRegister, useClass: RegisterUseCase },
    { provide: TOKENS.ILogin, useClass: LoginUseCase },
    { provide: TOKENS.IRefresh, useClass: RefreshUseCase },
    { provide: TOKENS.IGetUser, useClass: GetUserUseCase }, 
    { provide: TOKENS.UserRepository, useClass: UserRepositoryImpl },
    {provide:TOKENS.IChangePassword,useClass:    ChangePasswordUseCase,}
  ],
   exports: ['UserRepository'],
})
export class AuthModule {}
