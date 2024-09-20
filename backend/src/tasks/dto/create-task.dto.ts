import { IsOptional, IsString } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  planTitle: string

  @IsString()
  title: string

  @IsString()
  @IsOptional()
  content: string

  @IsString()
  dueDate: string
}
