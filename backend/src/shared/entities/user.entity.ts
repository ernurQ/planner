import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ApiProperty } from '@nestjs/swagger'
import { PlansEntity } from '@Shared/entities'
import { Expose } from 'class-transformer'

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @ApiProperty()
  @Expose()
  name: string

  @Column()
  password: string

  @OneToMany(() => PlansEntity, (plan) => plan.owner)
  @ApiProperty()
  @Expose()
  plans?: PlansEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (!this.password) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
}
