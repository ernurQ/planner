import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@Auth/auth.module'
import { AppConfig, DatabaseConfig, JwtConfig } from '@Config/configuration'
import { validationSchema } from '@Config/validationSchema'
import { PlansModule } from '@Plans/plans.module'
import { TasksModule } from '@Tasks/tasks.module'
import { TemplatesModule } from '@Templates/templates.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, JwtConfig],
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig.KEY],
      useFactory: (databaseConfig: ConfigType<typeof DatabaseConfig>) => ({
        type: 'postgres',
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.name,
        autoLoadEntities: databaseConfig.autoLoadEntities,
        synchronize: databaseConfig.synchronize,
      }),
    }),
    AuthModule,
    PlansModule,
    TasksModule,
    TemplatesModule,
  ],
})
export class AppModule {}
