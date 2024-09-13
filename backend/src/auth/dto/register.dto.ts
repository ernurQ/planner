import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RegisterDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  password: string
}
