import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'

import { PlansQueryService } from '@Plans/plans-query.service'
import {
  JwtAuth,
  JwtPayload,
  OptionalJwtAuth,
  OptionalJwtPayload,
} from '@Shared/decorators'
import { UserExistsGuard } from '@Shared/guards'
import { JwtTokenPayload } from '@Shared/types'

@ApiTags('Plans query')
@Controller('plans')
export class PlansQueryController {
  constructor(private readonly plansQueryService: PlansQueryService) {}

  /**
   * get my plans
   */
  @Get()
  @JwtAuth()
  async getPlans(@JwtPayload() payload: JwtTokenPayload) {
    return this.plansQueryService.getMyPlans(payload.name)
  }

  /**
   * get many plans by owner name
   */
  @Get('/:ownerName')
  @OptionalJwtAuth()
  @UseGuards(UserExistsGuard)
  async getPlansByOwnerName(
    @Param('ownerName') ownerName: string,
    @OptionalJwtPayload() payload: JwtTokenPayload | false,
  ) {
    if (payload !== false && ownerName === payload.name) {
      return this.plansQueryService.getMyPlans(ownerName)
    }

    return this.plansQueryService.getUserPlans(ownerName)
  }

  /**
   * get one plan
   */
  @Get('/:ownerName/:title')
  @OptionalJwtAuth()
  @ApiNotFoundResponse({ description: 'plan not found' })
  async getPlan(
    @Param('ownerName') ownerName: string,
    @Param('title') title: string,
    @OptionalJwtPayload() payload: JwtTokenPayload | false,
  ) {
    if (payload !== false && ownerName === payload.name) {
      return this.plansQueryService.getMyPlan(ownerName, title)
    }

    return this.plansQueryService.getUserPlan(ownerName, title)
  }
}
