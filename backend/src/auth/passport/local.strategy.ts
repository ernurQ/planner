import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import { Repository } from 'typeorm'

import { UsersEntity } from '@Shared/entities'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {
    super()
  }

  async validate(name: string, password: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOneBy({ name })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException()
    }

    return user
  }
}
