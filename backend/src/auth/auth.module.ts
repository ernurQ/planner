import { Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from '@Auth/auth.controller'
import { AuthService } from '@Auth/auth.service'
import { JwtStrategy, LocalStrategy } from '@Auth/passport'
import { JwtConfig } from '@Config/configuration'
import { UsersEntity } from '@Shared/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [JwtConfig.KEY],
      useFactory: (jwtConfig: ConfigType<typeof JwtConfig>) => ({
        secret: jwtConfig.secret,
        signOptions: { expiresIn: jwtConfig.accessTokenExpiresIn },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
