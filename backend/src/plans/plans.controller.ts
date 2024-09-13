import {
  Body,
  Controller,
  Delete,
  Get,
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
  OmitType,
} from '@nestjs/swagger'

import {
  CreatePlanDto,
  UpdateIsPrivateDto,
  UpdateIsTemplateDto,
  UpdatePlanDto,
} from '@Plans/dto'
import { PlansService } from '@Plans/plans.service'
import { JwtAuth, JwtPayload } from '@Shared/decorators'
import { PlansEntity } from '@Shared/entities'
import { JwtTokenPayload } from '@Shared/types'

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @JwtAuth()
  @ApiOkResponse({ description: 'List of user`s plans', type: [PlansEntity] })
  async getPlans(@JwtPayload() payload: JwtTokenPayload) {
    return this.plansService.getPlans(payload.name)
  }

  @Get('/:owner/:title')
  @ApiOkResponse({
    description: 'Plan info for unauthorized user',
    type: OmitType(PlansEntity, ['isPrivate'] as const),
  })
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async getPlanByTitleUnauthorized(
    @Param('owner') owner: string,
    @Param('title') title: string,
  ) {
    return this.plansService.getPlanByTitleUnauthorized(owner, title)
  }

  @Get('/:title')
  @JwtAuth()
  @ApiOkResponse({
    description: 'Plan info for authorized user',
    type: PlansEntity,
  })
  @ApiNotFoundResponse({ description: 'Plan not found' })
  async getPlanByTitleAuthorized(
    @Param('title') title: string,
    @JwtPayload() payload: JwtTokenPayload,
  ) {
    return this.plansService.getPlanByTitleAuthorized(title, payload.name)
  }

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
    return this.plansService.createPlan(createPlanDto, jwtPayload.name)
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
    console.log('work')
    return this.plansService.updatePlan(title, updatePlanDto, payload.name)
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
    return this.plansService.deletePlan(title, payload.name)
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
    return this.plansService.updateIsPrivate(
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
    return this.plansService.updateIsTemplate(
      updateIsTemplateDto,
      payload.name,
      title,
    )
  }
}
