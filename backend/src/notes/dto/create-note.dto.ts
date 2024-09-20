import { IsOptional, IsString } from 'class-validator'

export class CreateNoteDto {
  @IsString()
  planTitle: string

  @IsString()
  title: string

  @IsString()
  @IsOptional()
  content: string

  @IsString()
  date: string
}
