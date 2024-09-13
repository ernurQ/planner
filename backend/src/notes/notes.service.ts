import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateNoteDto } from '@Notes/dto'
import { NotesEntity, PlansEntity } from '@Shared/entities'

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity)
    private readonly notesRepository: Repository<NotesEntity>,
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}

  async createNote(createNoteDto: CreateNoteDto, ownerName: string) {
    const plan = await this.plansRepository.findOneBy({
      ownerName,
      title: createNoteDto.planTitle,
    })

    if (!plan) throw new NotFoundException('Plan not found')

    const note = this.notesRepository.create({
      ownerName,
      plan,
      ...createNoteDto,
    })
    return this.notesRepository.save(note)
  }
}
