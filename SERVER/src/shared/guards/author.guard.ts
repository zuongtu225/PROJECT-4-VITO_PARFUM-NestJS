import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.role.role == 1) {
      return true;
    }
    throw new HttpException(
      'Bạn không có quyền truy cập trang quản trị',
      HttpStatus.FORBIDDEN,
    );
  }
}
