import { Controller, Get, Param } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { OptionalJwtAuth, OptionalJwtPayload } from '@Shared/decorators'
import { UsersEntity } from '@Shared/entities'
import { JwtTokenPayload } from '@Shared/types'
import { GetMyProfileResponseDto, GetUserProfileResponseDto } from '@Users/dto'
import { UsersService } from '@Users/users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:name')
  @OptionalJwtAuth()
  // @ApiOkResponse({
  //   description: 'Get my info',
  //   type: GetMyProfileResponseDto,
  // })
  // @ApiOkResponse({
  //   description: 'Get user info',
  //   type: GetUserProfileResponseDto,
  // })
  @ApiExtraModels(
    GetMyProfileResponseDto,
    GetUserProfileResponseDto,
    UsersEntity,
  )
  @ApiResponse({
    status: 200,
    description: 'Get user or own profile',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(GetUserProfileResponseDto) },
        { $ref: getSchemaPath(GetMyProfileResponseDto) },
      ],
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getProfile(
    @Param('name') name: string,
    @OptionalJwtPayload() payload: JwtTokenPayload | boolean,
  ) {
    if (typeof payload !== 'boolean' && payload.name === name) {
      return this.usersService.getMyProfile(name)
    }

    return this.usersService.getUserProfile(name)
  }
}
