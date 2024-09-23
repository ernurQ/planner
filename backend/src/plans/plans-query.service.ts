import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GetOnePlanResponseDto } from '@Plans/dto-query'
import { PlansEntity } from '@Shared/entities'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class PlansQueryService {
  constructor(
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}

  async getMyPlans(username: string) {
    return this.findManyPlans(username)
  }

  async getUserPlans(username: string) {
    return this.findManyPlans(username, { isPrivate: false })
  }

  async getMyPlan(ownerName: string, title: string) {
    return plainToInstance(GetOnePlanResponseDto, {
      plan: await this.findOnePlan(ownerName, title),
      isOwner: true,
    })
  }

  async getUserPlan(ownerName: string, title: string) {
    return plainToInstance(GetOnePlanResponseDto, {
      plan: await this.findOnePlan(ownerName, title, { isPrivate: false }),
      isOwner: false,
    })
  }

  private async findOnePlan(
    ownerName: string,
    title: string,
    { isPrivate }: { isPrivate?: boolean } = {},
    { tasks }: { tasks?: boolean } = {
      tasks: true,
    },
  ) {
    const query = this.plansRepository
      .createQueryBuilder('plan')
      .where('plan.ownerName = :ownerName', { ownerName })
      .andWhere('plan.title = :title', { title })

    if (isPrivate !== undefined) {
      query.andWhere('plan.isPrivate = :isPrivate', { isPrivate })
    }

    if (tasks) {
      query.leftJoinAndSelect('plan.tasks', 'tasks')
    }

    const plan = await query.getOne()
    if (!plan) throw new NotFoundException('Plan not found')
    return plan
  }

  private async findManyPlans(
    ownerName: string,
    { isPrivate }: { isPrivate?: boolean } = {},
  ) {
    const query = this.plansRepository
      .createQueryBuilder('plan')
      .where('plan.ownerName = :ownerName', { ownerName })
    if (isPrivate !== undefined) {
      query.andWhere('plan.isPrivate = :isPrivate', { isPrivate })
    }

    return query.getMany()
  }
}
