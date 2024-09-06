import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { UsersEntity } from '@Shared/entities'

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

  @ManyToOne(() => UsersEntity, (user) => user.plans)
  @JoinColumn({ name: 'ownerName', referencedColumnName: 'name' })
  owner?: UsersEntity
}
