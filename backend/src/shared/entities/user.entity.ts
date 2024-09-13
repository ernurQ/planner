import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { PlansEntity } from '@Shared/entities'

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ unique: true })
  name: string

  @Column()
  password: string

  @OneToMany(() => PlansEntity, (plan) => plan.owner)
  plans?: PlansEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (!this.password) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
}
