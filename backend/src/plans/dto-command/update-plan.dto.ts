import { OmitType, PartialType } from '@nestjs/swagger'
import { CreatePlanDto } from '@Plans/dto-command'

export class UpdatePlanDto extends PartialType(
  OmitType(CreatePlanDto, ['title'] as const),
) {}
