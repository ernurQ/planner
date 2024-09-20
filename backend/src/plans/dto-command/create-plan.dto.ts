import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreatePlanDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPrivate: boolean

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isTemplate: boolean
}
