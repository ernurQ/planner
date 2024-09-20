import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { JwtTokenPayload } from '@Shared/types'
import { CreateTaskDto } from '@Tasks/dto'
import { TasksService } from '@Tasks/tasks.service'

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * create task
   */
  @Post()
  @JwtAuth()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.tasksService.createTask(createTaskDto, payload.name)
  }
}
