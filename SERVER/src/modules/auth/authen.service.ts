import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenRepository } from './authen.repository';
import { LoginDto, RegisterDto } from './dto/authen.dto';
import * as bcrypt from 'bcrypt';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { IResponseAuth } from './interface/authen.response';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthenService {
  constructor(
    private readonly authenRepository: AuthenRepository,
    private jwtService: JwtService,
  ) {}
  async registerService(body: RegisterDto): Promise<IResponse> {
    const newPassword = await bcrypt.hash(body.password, 10);
    body.password = newPassword;
    const newAccount = {
      email: body.email,
      password: newPassword,
      avatar: '',
      firstName: '',
      lastName: '',
      refreshToken: null,
      role: body.role,
      status: true,
    };
    const response = await this.authenRepository.register(newAccount);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Đăng ký thành công',
      };
    }
    throw new BadRequestException('Đăng ký thất bại');
  }

  async loginService(body: LoginDto): Promise<IResponseAuth> {
    return this.authenRepository.login(body);
  }

  async loginGoogleService(req: any) {
    return await this.authenRepository.loginGoogleRepository(req.user);
  }
}
