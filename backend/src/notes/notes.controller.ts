import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateNoteDto } from '@Notes/dto'
import { NotesService } from '@Notes/notes.service'
import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { JwtTokenPayload } from '@Shared/types'

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @JwtAuth()
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.notesService.createNote(createNoteDto, payload.name)
  }
}
