import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { PlansEntity } from '@Shared/entities'

@Entity('tasks')
export class TasksEntity {
  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  planId: string

  @Column()
  ownerName: string

  @ApiProperty()
  @Expose()
  @Column()
  title: string

  @ApiProperty()
  @Expose()
  @Column({ default: '' })
  content: string

  @ApiProperty()
  @Expose()
  @Column()
  dueDate: string

  @ApiProperty()
  @Expose()
  @Column({ default: false })
  isDone: boolean

  @ManyToOne(() => PlansEntity, (plan) => plan.tasks)
  plan?: PlansEntity
}
