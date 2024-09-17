import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlansCommandController } from '@Plans/plans-command.controller'
import { PlansCommandService } from '@Plans/plans-command.service'
import { PlansQueryController } from '@Plans/plans-query.controller'
import { PlansQueryService } from '@Plans/plans-query.service'
import { PlansEntity, UsersEntity } from '@Shared/entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity, UsersEntity])],
  controllers: [PlansCommandController, PlansQueryController],
  providers: [PlansCommandService, PlansQueryService],
})
export class PlansModule {}
