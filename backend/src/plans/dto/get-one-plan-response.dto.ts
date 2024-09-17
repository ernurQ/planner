import { ApiProperty } from '@nestjs/swagger'
import { PlansEntity } from '@Shared/entities'
import { Expose } from 'class-transformer'

export class GetOnePlanResponseDto extends PlansEntity {
  @ApiProperty()
  @Expose()
  isOwner: boolean
}
