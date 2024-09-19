import { Transform } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class UpdateIsPrivateDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isPrivate: boolean
}
