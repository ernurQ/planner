import { Transform } from 'class-transformer'
import { IsBoolean, IsString } from 'class-validator'

export class CreatePlanWithTemplateDto {
  @IsString()
  templateOwner: string

  @IsString()
  templateTitle: string

  @IsString()
  title: string

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isPrivate: boolean
}
