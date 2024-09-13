import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TemplatesController } from '@Templates/templates.controller'
import { TemplatesService } from '@Templates/templates.service'

import { NotesEntity, PlansEntity, TasksEntity } from '@Shared/entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity, NotesEntity, TasksEntity])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
