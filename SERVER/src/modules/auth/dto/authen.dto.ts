import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @MinLength(8, { message: 'Vui lòng nhập nhiều hơn 8 ký tự' })
  @MaxLength(30, { message: 'Vui lòng nhập ít hơn 30 ký tự' })
  password: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  avatar: string;
  @IsNumber()
  role: number;
  @IsString()
  @IsOptional()
  refreshToken: string;
}
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'Vui lòng nhập nhiều hơn 8 ký tự' })
  @MaxLength(30, { message: 'Vui lòng nhập ít hơn 30 ký tự' })
  password: string;
}
