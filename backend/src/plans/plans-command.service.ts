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
} from '@Plans/dto-command'
import { PlansEntity } from '@Shared/entities'

@Injectable()
export class PlansCommandService {
  constructor(
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}

  async createPlan(createPlanDto: CreatePlanDto, ownerName: string) {
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
    { description, isPrivate, isTemplate }: UpdatePlanDto,
    ownerName: string,
  ) {
    const plan = await this.plansRepository.findOneBy({
      ownerName,
      title,
    })
    if (!plan) throw new NotFoundException('Plan not found')

    if (description !== undefined) plan.description = description
    if (isPrivate !== undefined) plan.isPrivate = isPrivate
    if (isTemplate !== undefined) plan.isTemplate = isTemplate

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
