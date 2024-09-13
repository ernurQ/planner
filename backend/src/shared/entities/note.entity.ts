import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { PlansEntity } from '@Shared/entities/plan.entity'

@Entity('notes')
export class NotesEntity {
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
  date: Date

  @ManyToOne(() => PlansEntity, (plan) => plan.notes)
  plan: PlansEntity
}
