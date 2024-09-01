import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtConfig } from '@Config/configuration'
import { JwtTokenPayload } from '@Shared/types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate(payload: any): Promise<JwtTokenPayload> {
    return plainToInstance(JwtTokenPayload, {
      sub: payload.sub,
      name: payload.name,
    })
  }
}
