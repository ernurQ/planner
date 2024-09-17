import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GetManyPlansResponseDto } from '@Plans/dto/get-many-plans-response.dto'

import { PlansQueryService } from '@Plans/plans-query.service'
import {
  JwtAuth,
  JwtPayload,
  OptionalJwtAuth,
  OptionalJwtPayload,
} from '@Shared/decorators'
import { PlansEntity } from '@Shared/entities'
import { UserExistsGuard } from '@Shared/guards'
import { JwtTokenPayload } from '@Shared/types'

@ApiTags('Plans query')
@Controller('plans')
export class PlansQueryController {
  constructor(private readonly plansQueryService: PlansQueryService) {}

  @Get()
  @JwtAuth()
  @ApiOkResponse({ description: 'List of user`s plans', type: [PlansEntity] })
  async getPlans(@JwtPayload() payload: JwtTokenPayload) {
    return this.plansQueryService.getMyPlans(payload.name)
  }

  @Get('/:ownerName')
  @OptionalJwtAuth()
  @UseGuards(UserExistsGuard)
  @ApiOkResponse({
    description: 'List of user plans',
    type: GetManyPlansResponseDto,
  })
  async getPlansByOwnerName(
    @Param('ownerName') ownerName: string,
    @OptionalJwtPayload() payload: JwtTokenPayload | false,
  ) {
    if (payload !== false && ownerName === payload.name) {
      return this.plansQueryService.getMyPlans(ownerName)
    }

    return this.plansQueryService.getUserPlans(ownerName)
  }

  @Get('/:ownerName/:title')
  @OptionalJwtAuth()
  @ApiOkResponse({ description: 'Plan info', type: PlansEntity })
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
