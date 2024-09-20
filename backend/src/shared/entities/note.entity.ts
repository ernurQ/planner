import { ApiHideProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { PlansEntity } from '@Shared/entities/plan.entity'

@Entity('notes')
export class NotesEntity {
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

  @ApiHideProperty()
  @ManyToOne(() => PlansEntity, (plan) => plan.notes)
  plan: PlansEntity
}
