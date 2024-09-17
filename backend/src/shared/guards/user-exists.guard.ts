import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersEntity } from '@Shared/entities'
import { Repository } from 'typeorm'

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { username, name, ownerName } = context
      .switchToHttp()
      .getRequest().params
    const queryUsername = username || name || ownerName

    const user = await this.userRepository.findOne({
      where: { name: queryUsername },
    })

    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    return true
  }
}
