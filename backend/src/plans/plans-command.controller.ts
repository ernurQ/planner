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
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger'

import {
  CreatePlanDto,
  UpdateIsPrivateDto,
  UpdateIsTemplateDto,
  UpdatePlanDto,
} from '@Plans/dto-command'
import { PlansCommandService } from '@Plans/plans-command.service'
import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { JwtTokenPayload } from '@Shared/types'

@ApiTags('Plans command')
@Controller('plans')
export class PlansCommandController {
  constructor(private readonly plansCommandService: PlansCommandService) {}

  /**
   * create plan
   */
  @Post()
  @JwtAuth()
  @ApiConflictResponse({ description: 'Plan with this title already exists' })
  async createPlan(
    @Body() createPlanDto: CreatePlanDto,
    @JwtPayload() jwtPayload: JwtTokenPayload,
  ) {
    return this.plansCommandService.createPlan(createPlanDto, jwtPayload.name)
  }

  /**
   * update plan
   */
  @Put('/:title')
  @JwtAuth()
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

  /**
   * delete plan
   */
  @Delete('/:title')
  @JwtAuth()
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async deletePlan(
    @Param('title') title: string,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.plansCommandService.deletePlan(title, payload.name)
  }

  /**
   * update plan isPrivate field
   */
  @Patch('/:title/is-private')
  @JwtAuth()
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

  /**
   * update plan isTemplate field
   */
  @Patch('/:title/is-template')
  @JwtAuth()
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
