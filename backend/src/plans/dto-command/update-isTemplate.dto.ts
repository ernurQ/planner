import { Transform } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class UpdateIsTemplateDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isTemplate: boolean
}
