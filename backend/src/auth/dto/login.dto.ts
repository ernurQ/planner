import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  username: string

  @ApiProperty()
  password: string
}
