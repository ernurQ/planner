import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  planTitle: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string

  @ApiProperty()
  @IsString()
  dueDate: string
}
