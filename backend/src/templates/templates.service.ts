import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PlansEntity, TasksEntity } from '@Shared/entities'
import { addMinutes, differenceInMinutes } from 'date-fns'
import { Repository } from 'typeorm'

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async findTemplate(
    userName: string,
    templateOwner: string,
    templateTitle: string,
  ) {
    let template: PlansEntity | null

    if (userName === templateOwner) {
      template = await this.plansRepository.findOne({
        where: {
          isTemplate: true,
          ownerName: userName,
          title: templateTitle,
        },
        relations: { tasks: true },
      })
    } else {
      template = await this.plansRepository.findOne({
        where: {
          isTemplate: true,
          isPrivate: false,
          ownerName: templateOwner,
          title: templateTitle,
        },
        relations: { tasks: true },
      })
    }
    if (!template) throw new NotFoundException('Template not found')

    return template
  }

  async copyTemplate(
    template: PlansEntity,
    planTitle: string,
    isPrivate: boolean,
    username: string,
  ) {
    const plan = await this.copyPlansEntity(template, {
      title: planTitle,
      isPrivate,
      ownerName: username,
    })
    template.tasks?.forEach((task) => {
      this.copyTasksEntity(task, {
        planId: plan.id,
        ownerName: username,
        date: this.calculateDate(template.createdAt, task.date),
      })
    })

    return plan
  }

  private async copyPlansEntity(
    plansEntity: PlansEntity,
    {
      title,
      isPrivate,
      ownerName,
    }: { title: string; isPrivate: boolean; ownerName: string },
  ) {
    const plan = this.plansRepository.create({
      ...plansEntity,
      id: undefined,
      ownerName,
      isPrivate,
      createdAt: undefined,
      isTemplate: false,
      title,
      owner: undefined,
      tasks: undefined,
    })
    return this.plansRepository.save(plan)
  }

  private async copyTasksEntity(
    tasksEntity: TasksEntity,
    {
      planId,
      ownerName,
      date,
    }: { planId: string; ownerName: string; date: Date },
  ) {
    const task = this.tasksRepository.create({
      ...tasksEntity,
      id: undefined,
      planId,
      ownerName,
      date,
      isDone: false,
      plan: undefined,
    })
    return this.tasksRepository.save(task)
  }

  private calculateDate(planStartDate: Date, endDate: Date) {
    const diffInMinutes = differenceInMinutes(endDate, planStartDate)
    return addMinutes(new Date(), diffInMinutes)
  }
}
