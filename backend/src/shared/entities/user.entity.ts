import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ApiHideProperty } from '@nestjs/swagger'
import { PlansEntity } from '@Shared/entities'
import { Expose } from 'class-transformer'

@Entity('users')
export class UsersEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @Expose()
  name: string

  @ApiHideProperty()
  @Column()
  password: string

  @OneToMany(() => PlansEntity, (plan) => plan.owner)
  @Expose()
  @ApiHideProperty()
  plans?: PlansEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (!this.password) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
}
