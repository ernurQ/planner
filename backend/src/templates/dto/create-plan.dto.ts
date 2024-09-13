import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsString } from 'class-validator'

export class CreatePlanDto {
  @ApiProperty()
  @IsString()
  templateOwner: string

  @ApiProperty()
  @IsString()
  templateTitle: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isPrivate: boolean
}
