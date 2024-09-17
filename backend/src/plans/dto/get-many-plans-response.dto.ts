import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { PlansEntity } from '@Shared/entities'

export class GetManyPlansResponseDto {
  @ApiProperty()
  @Expose()
  templates: PlansEntity[]

  @ApiProperty()
  @Expose()
  plans: PlansEntity[]

  @ApiProperty()
  @Expose()
  isOwner: boolean
}
