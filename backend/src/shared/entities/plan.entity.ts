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
import { ApiHideProperty } from '@nestjs/swagger'

@Entity('plans')
@Unique(['ownerName', 'title'])
export class PlansEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: string

  @Expose()
  @Column()
  ownerName: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column({ default: '' })
  description: string

  @Expose()
  @Column()
  isPrivate: boolean

  @Expose()
  @Column({ default: false })
  isTemplate: boolean

  @Expose()
  @CreateDateColumn()
  createdAt: Date

  @ApiHideProperty()
  @ManyToOne(() => UsersEntity, (user) => user.plans)
  @JoinColumn({ name: 'ownerName', referencedColumnName: 'name' })
  owner?: UsersEntity

  @ApiHideProperty()
  @Expose()
  @OneToMany(() => NotesEntity, (note) => note.plan)
  notes?: NotesEntity[]

  @ApiHideProperty()
  @Expose()
  @OneToMany(() => TasksEntity, (task) => task.plan)
  tasks?: TasksEntity[]
}
