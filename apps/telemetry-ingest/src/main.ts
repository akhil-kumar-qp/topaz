import {NestFactory} from '@nestjs/core'
import {TelemetryIngestModule} from './telemetry-ingest.module'
import {Logger, ValidationPipe} from '@nestjs/common'
import {NestExpressApplication} from '@nestjs/platform-express'
import {ConfigService} from '@nestjs/config'
import {TelemetryIngestAppConfig} from 'libs/data-infra/config/telemetry-ingest-app-config.interface'
import {getConfigOrThrow} from 'libs/data-infra/config/setup-config.method'

async function bootstrap(): Promise<void> {
  validateEnvSetup()
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

  const configService = app.get<ConfigService>(ConfigService)
  const appConfig = getConfigOrThrow<TelemetryIngestAppConfig>(
    configService,
    'telemetryIngestApp',
  )
  const {port} = appConfig
  const PORT = Number(port) || 3000

  app.setGlobalPrefix('/telemetry-ingest/api')
  await app.listen(PORT)

  logger.debug(
    `TELEMETRY-INGEST APP STARTED, port: ${PORT}, env: ${process.env.ENVIRONMENT}`,
  )
}

const validateEnvSetup = (): void => {
  if (!process.env.ENVIRONMENT) {
    throw new Error('ENVIRONMENT variable is not setup')
  }
}

bootstrap()
