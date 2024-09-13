import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PlansEntity, TasksEntity } from '@Shared/entities'
import { CreateTaskDto } from '@Tasks/dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, ownerName: string) {
    const plan = await this.plansRepository.findOneBy({
      ownerName,
      title: createTaskDto.planTitle,
    })
    if (!plan) throw new NotFoundException('Plan not found')

    const task = this.tasksRepository.create({
      ownerName,
      plan,
      ...createTaskDto,
    })

    return this.tasksRepository.save(task)
  }
}
