import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GetOnePlanResponseDto } from '@Plans/dto'
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
      ...(await this.findOnePlan(ownerName, title)),
      isOwner: true,
    })
  }

  async getUserPlan(ownerName: string, title: string) {
    return plainToInstance(GetOnePlanResponseDto, {
      ...(await this.findOnePlan(ownerName, title, { isPrivate: false })),
      isOwner: false,
    })
  }

  private async findOnePlan(
    ownerName: string,
    title: string,
    { isPrivate }: { isPrivate?: boolean } = {},
    { notes, tasks }: { notes?: boolean; tasks?: boolean } = {
      notes: true,
      tasks: true,
    },
  ) {
    const query = await this.plansRepository
      .createQueryBuilder('plan')
      .where('plan.ownerName = :ownerName', { ownerName })
      .andWhere('plan.title = :title', { title })

    if (isPrivate !== undefined) {
      query.andWhere('plan.isPrivate = :isPrivate', { isPrivate })
    }

    if (notes) {
      query.leftJoinAndSelect('plan.notes', 'notes')
    }
    if (tasks) {
      query.leftJoinAndSelect('plan.tasks', 'tasks')
    }

    return query.getOne()
  }

  private async findManyPlans(
    ownerName: string,
    { isPrivate }: { isPrivate?: boolean } = {},
  ) {
    const query = await this.plansRepository
      .createQueryBuilder('plan')
      .where('plan.ownerName = :ownerName', { ownerName })
    if (isPrivate !== undefined) {
      query.andWhere('plan.isPrivate = :isPrivate', { isPrivate })
    }

    return query.getMany()
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
}
