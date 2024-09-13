import { Body, Controller, Post } from '@nestjs/common'

import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { JwtTokenPayload } from '@Shared/types'
import { CreateTaskDto } from '@Tasks/dto'
import { TasksService } from '@Tasks/tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @JwtAuth()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.tasksService.createTask(createTaskDto, payload.name)
  }
}
