import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlansEntity, TasksEntity } from '@Shared/entities'
import { TasksController } from '@Tasks/tasks.controller'
import { TasksService } from '@Tasks/tasks.service'

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity, TasksEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
