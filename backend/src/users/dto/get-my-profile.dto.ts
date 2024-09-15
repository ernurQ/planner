import { ApiProperty } from '@nestjs/swagger'
import { PlansEntity, UsersEntity } from '@Shared/entities'
import { Expose } from 'class-transformer'

export class GetMyProfileResponseDto extends UsersEntity {
  @ApiProperty()
  @Expose()
  templates: PlansEntity[]

  @ApiProperty()
  @Expose()
  plans: PlansEntity[]
}
