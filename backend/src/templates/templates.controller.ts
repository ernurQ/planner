import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger'

import { CreatePlanDto } from '@Templates/dto'
import { TemplatesService } from '@Templates/templates.service'

import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { PlansEntity } from '@Shared/entities'
import { JwtTokenPayload } from '@Shared/types'

@Controller('templates')
@ApiTags('Templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @JwtAuth()
  @ApiCreatedResponse({
    description: 'Plan successfully created',
    type: PlansEntity,
  })
  @ApiNotFoundResponse({ description: 'Template not found' })
  async createPlan(
    @Body() createPlanDto: CreatePlanDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    const { templateOwner, templateTitle, title, isPrivate } = createPlanDto
    const template = await this.templatesService.findTemplate(
      payload.name,
      templateOwner,
      templateTitle,
    )

    return this.templatesService.copyTemplate(
      template,
      title,
      isPrivate,
      payload.name,
    )
  }
}
