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
    // TODO: hash password
  }
}
