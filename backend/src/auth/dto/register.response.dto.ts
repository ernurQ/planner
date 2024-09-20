import { Expose } from 'class-transformer'

export class RegisterResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string
}
