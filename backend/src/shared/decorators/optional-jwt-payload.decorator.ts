import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const OptionalJwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user
  },
)
