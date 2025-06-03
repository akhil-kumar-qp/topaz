import {NestFactory} from '@nestjs/core'
import {TelemetryIngestModule} from './telemetry-ingest.module'
import {Logger, ValidationPipe} from '@nestjs/common'
import {NestExpressApplication} from '@nestjs/platform-express'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    TelemetryIngestModule,
  )

  const logger = new Logger('telemetry-ingest:main.ts:bootstrap')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  const PORT = Number(process.env.PORT) || 3000
  app.setGlobalPrefix('/telemetry-ingest/api')
  await app.listen(PORT)

  logger.debug(
    `TELEMETRY-INGEST APP STARTED, port: ${PORT}, env: ${process.env.ENVIRONMENT}`,
  )
}

bootstrap()
