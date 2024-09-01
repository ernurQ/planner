import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ unique: true })
  name: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (!this.password) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
}
