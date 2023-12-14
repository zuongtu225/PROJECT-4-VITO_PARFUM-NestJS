import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenController } from './authen.controller';
import { User } from '../user/entities/user.entity';
import { AuthenService } from './authen.service';
import { AuthenRepository } from './authen.repository';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthenController],
  providers: [AuthenService, AuthenRepository],
  exports: [AuthenService, PassportModule],
})
export class AuthenModule {}
