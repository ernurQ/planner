import { PlansEntity, UsersEntity } from '@Shared/entities'
import { Expose } from 'class-transformer'

export class GetUserProfileResponseDto extends UsersEntity {
  @Expose()
  templates: PlansEntity[]

  @Expose()
  plans: PlansEntity[]
}
