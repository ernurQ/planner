import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  setupSwagger(app)
  setupDTOSerialization(app)

  const configService = app.get(ConfigService)
  const port = configService.get<number>('app.port')!

  await app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Planner backend API')
    .setVersion('1.0')
    .addTag('Planner backend API')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

function setupDTOSerialization(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  )
}

bootstrap()
