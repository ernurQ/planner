import { applyDecorators, UseGuards } from '@nestjs/common'

import { OptionalJwtAuthGuard } from '@Shared/guards'

export const OptionalJwtAuth = () =>
  applyDecorators(UseGuards(OptionalJwtAuthGuard))
