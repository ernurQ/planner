import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class UpdateIsTemplateDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isTemplate: boolean
}
