import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Tạo CurrentUser decorator
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
