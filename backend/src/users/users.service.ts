import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PlansEntity, UsersEntity } from '@Shared/entities'
import { GetMyProfileResponseDto, GetUserProfileResponseDto } from '@Users/dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async getMyProfile(name: string) {
    const { user, plans } = await this.findUserWithPlans(name)
    return plainToInstance(GetMyProfileResponseDto, {
      ...user,
      ...this.divideToPlansTemplates(plans),
    })
  }

  async getUserProfile(name: string) {
    const { user, plans } = await this.findUserWithPlans(name, {
      isPrivate: false,
    })
    return plainToInstance(GetUserProfileResponseDto, {
      ...user,
      ...this.divideToPlansTemplates(plans),
    })
  }

  private divideToPlansTemplates(entities: PlansEntity[]) {
    const templates: PlansEntity[] = []
    const plans: PlansEntity[] = []
    entities.forEach((entity) => {
      if (entity.isTemplate) {
        templates.push(entity)
      } else {
        plans.push(entity)
      }
    })

    return { templates, plans }
  }

  private async findUserWithPlans(
    name: string,
    { isPrivate }: { isPrivate?: boolean } = {},
  ) {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .where('name = :name', { name })
      .leftJoinAndSelect('user.plans', 'plan')
      .where('user.name = :ownerName', { ownerName: name })

    if (isPrivate !== undefined)
      query.andWhere('plan.isPrivate = :isPrivate', { isPrivate })

    const res = await query.getOne()
    if (!res) throw new NotFoundException('User not found')
    res.plans = res.plans ? res.plans : []

    const { plans, ...user } = res

    return { plans, user }
  }
}
