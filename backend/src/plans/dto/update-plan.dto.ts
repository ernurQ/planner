import { OmitType, PartialType } from '@nestjs/swagger'
import { CreatePlanDto } from '@Plans/dto/create-plan.dto'

export class UpdatePlanDto extends PartialType(
  OmitType(CreatePlanDto, ['title'] as const),
) {}
