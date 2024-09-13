import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  CreatePlanDto,
  UpdateIsPrivateDto,
  UpdateIsTemplateDto,
  UpdatePlanDto,
} from '@Plans/dto'
import { PlansEntity } from '@Shared/entities'

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}

  async getPlans(ownerName: string) {
    return this.plansRepository.find({
      where: { ownerName },
    })
  }

  async getPlanByTitleUnauthorized(ownerName: string, title: string) {
    const plan = await this.plansRepository.findOne({
      where: { ownerName, title, isPrivate: false },
      relations: { notes: true, tasks: true },
      select: {
        id: true,
        ownerName: true,
        title: true,
        description: true,
        createdAt: true,
        notes: { title: true, content: true },
        tasks: {
          id: true,
          title: true,
          content: true,
          dueDate: true,
        },
      },
    })
    if (!plan) throw new NotFoundException('Plan not found')

    return plan
  }

  async getPlanByTitleAuthorized(title: string, ownerName: string) {
    const plan = await this.plansRepository.findOne({
      where: { title, ownerName },
      relations: { notes: true, tasks: true },
      select: {
        notes: { id: true, title: true, content: true },
        tasks: {
          id: true,
          title: true,
          content: true,
          dueDate: true,
          isDone: true,
        },
      },
    })
    if (!plan) throw new NotFoundException('Plan not found')

    return plan
  }

  async createPlan(
    createPlanDto: CreatePlanDto,
    ownerName: string,
  ): Promise<PlansEntity> {
    const planExists = await this.plansRepository.findOneBy({
      ownerName,
      title: createPlanDto.title,
    })

    if (planExists) throw new ConflictException('Plan already exists')

    const newPlan = this.plansRepository.create({
      ownerName,
      ...createPlanDto,
    })

    return this.plansRepository.save(newPlan)
  }

  async updatePlan(
    title: string,
    { description, isPrivate }: UpdatePlanDto,
    ownerName: string,
  ) {
    const plan = await this.plansRepository.findOneBy({
      ownerName,
      title,
    })
    if (!plan) throw new NotFoundException('Plan not found')

    if (description) plan.description = description
    if (isPrivate) plan.isPrivate = isPrivate

    return this.plansRepository.save(plan)
  }

  async deletePlan(title: string, ownerName: string) {
    const plan = await this.plansRepository.findOneBy({ title, ownerName })
    if (!plan) throw new NotFoundException('Plan not found')
    return this.plansRepository.remove(plan)
  }

  async updateIsPrivate(
    updateIsPrivateDto: UpdateIsPrivateDto,
    ownerName: string,
    title: string,
  ) {
    const plan = await this.plansRepository.findOneBy({ title, ownerName })
    if (!plan) throw new NotFoundException('Plan not found')

    plan.isPrivate = updateIsPrivateDto.isPrivate

    return this.plansRepository.save(plan)
  }

  async updateIsTemplate(
    updateIsTemplateDto: UpdateIsTemplateDto,
    ownerName: string,
    title: string,
  ) {
    const plan = await this.plansRepository.findOneBy({ title, ownerName })
    if (!plan) throw new NotFoundException('Plan not found')

    plan.isTemplate = updateIsTemplateDto.isTemplate

    return this.plansRepository.save(plan)
  }
}
