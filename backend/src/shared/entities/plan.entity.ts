import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

import { NotesEntity, TasksEntity, UsersEntity } from '@Shared/entities'

@Entity('plans')
@Unique(['ownerName', 'title'])
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

  @Expose()
  @OneToMany(() => NotesEntity, (note) => note.plan)
  notes?: NotesEntity[]

  @Expose()
  @OneToMany(() => TasksEntity, (task) => task.plan)
  tasks?: TasksEntity[]
}
