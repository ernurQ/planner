import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const payload = ctx.switchToHttp().getRequest().user
    if (!payload) {
      throw new UnauthorizedException()
    }
    return payload
  },
)
