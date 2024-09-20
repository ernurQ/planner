import { PlansEntity } from '@Shared/entities'
import { Expose } from 'class-transformer'

export class GetOnePlanResponseDto {
  @Expose()
  plan: PlansEntity

  @Expose()
  isOwner: boolean
}
