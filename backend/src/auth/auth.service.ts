import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'

import { LoginResponseDto, RegisterDto, RegisterResponseDto } from '@Auth/dto'
import { UsersEntity } from '@Shared/entities'
import { JwtTokenPayload } from '@Shared/types'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    name,
    password,
  }: RegisterDto): Promise<RegisterResponseDto> {
    const userExists = await this.usersRepository.findOneBy({ name })
    if (userExists) {
      throw new ConflictException('User already exists')
    }

    const newUser = this.usersRepository.create({ name, password })

    return plainToInstance(
      RegisterResponseDto,
      await this.usersRepository.save(newUser),
    )
  }

  async login(user: UsersEntity): Promise<LoginResponseDto> {
    const payload: JwtTokenPayload = { name: user.name, sub: user.id }

    return plainToInstance(LoginResponseDto, {
      token: this.jwtService.sign(payload),
    })
  }
}
