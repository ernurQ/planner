import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import {
  CreatePlanDto,
  UpdateIsPrivateDto,
  UpdateIsTemplateDto,
  UpdatePlanDto,
} from '@Plans/dto'
import { PlansCommandService } from '@Plans/plans-command.service'
import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { PlansEntity } from '@Shared/entities'
import { JwtTokenPayload } from '@Shared/types'

@ApiTags('Plans command')
@Controller('plans')
export class PlansCommandController {
  constructor(private readonly plansCommandService: PlansCommandService) {}

  @Post()
  @JwtAuth()
  @ApiCreatedResponse({
    description: 'Plan successfully created',
    type: PlansEntity,
  })
  async createPlan(
    @Body() createPlanDto: CreatePlanDto,
    @JwtPayload() jwtPayload: JwtTokenPayload,
  ) {
    return this.plansCommandService.createPlan(createPlanDto, jwtPayload.name)
  }

  @Put('/:title')
  @JwtAuth()
  @ApiOkResponse({
    description: 'Plan successfully updated',
    type: PlansEntity,
  })
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async updatePlan(
    @Param('title') title: string,
    @Body() updatePlanDto: UpdatePlanDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.plansCommandService.updatePlan(
      title,
      updatePlanDto,
      payload.name,
    )
  }

  @Delete('/:title')
  @JwtAuth()
  @ApiOkResponse({
    description: 'Plan successfully deleted',
    type: PlansEntity,
  })
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async deletePlan(
    @Param('title') title: string,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.plansCommandService.deletePlan(title, payload.name)
  }

  @Patch('/:title/is-private')
  @JwtAuth()
  @ApiOkResponse({
    description: 'Plan successfully updated',
    type: PlansEntity,
  })
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async updateIsPrivate(
    @Param('title') title: string,
    @Body() updateIsPrivateDto: UpdateIsPrivateDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.plansCommandService.updateIsPrivate(
      updateIsPrivateDto,
      payload.name,
      title,
    )
  }

  @Patch('/:title/is-template')
  @JwtAuth()
  @ApiOkResponse({
    description: 'Plan successfully updated',
    type: PlansEntity,
  })
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async updateIsTemplate(
    @Param('title') title: string,
    @Body() updateIsTemplateDto: UpdateIsTemplateDto,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.plansCommandService.updateIsTemplate(
      updateIsTemplateDto,
      payload.name,
      title,
    )
  }
}
