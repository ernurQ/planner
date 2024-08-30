import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppConfig, DatabaseConfig, JwtConfig } from '@Config/configuration'
import { validationSchema } from '@Config/validationSchema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, JwtConfig],
      validationSchema: validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
