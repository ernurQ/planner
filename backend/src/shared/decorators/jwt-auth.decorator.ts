import { applyDecorators, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@Shared/guards'

export const JwtAuth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard))
}
