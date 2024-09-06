import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotesController } from '@Notes/notes.controller'
import { NotesService } from '@Notes/notes.service'
import { NotesEntity, PlansEntity } from '@Shared/entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity, NotesEntity])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
