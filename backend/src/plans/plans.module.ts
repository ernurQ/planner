import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlansController } from '@Plans/plans.controller'
import { PlansService } from '@Plans/plans.service'
import { PlansEntity } from '@Shared/entities'

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
