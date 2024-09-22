import { ApiHideProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { PlansEntity } from '@Shared/entities'

@Entity('tasks')
export class TasksEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @ApiHideProperty()
  @Column()
  planId: string

  @ApiHideProperty()
  @Column()
  ownerName: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column({ default: '' })
  content: string

  @Expose()
  @Column()
  date: Date

  @Expose()
  @Column({ default: false })
  isDone: boolean

  @ApiHideProperty()
  @ManyToOne(() => PlansEntity, (plan) => plan.tasks)
  plan?: PlansEntity
}
