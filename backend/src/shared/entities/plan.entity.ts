import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('plans')
export class PlansEntity {
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty()
  @Expose()
  @Column()
  ownerName: string

  @ApiProperty()
  @Expose()
  @Column()
  title: string

  @ApiProperty()
  @Expose()
  @Column({ default: '' })
  description: string

  @ApiProperty()
  @Expose()
  @Column()
  isPrivate: boolean

  @ApiProperty()
  @Expose()
  @CreateDateColumn()
  createdAt: Date
}
