import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from '@Auth/auth.service'
import { LoginDto, RegisterDto } from '@Auth/dto'
import { UsersEntity } from '@Shared/entities'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * register
   */
  @Post('register')
  @ApiConflictResponse({ description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  /**
   * login
   */
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'User not found' })
  @ApiBody({ type: LoginDto })
  async login(@Req() req: Request & { user: UsersEntity }) {
    return this.authService.login(req.user)
  }
}
