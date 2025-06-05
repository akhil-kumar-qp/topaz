import {ConfigFactory, ConfigService, registerAs} from '@nestjs/config'
import * as fs from 'fs'
import {join} from 'path'
import {TelemetryIngestAppConfig} from './telemetry-ingest-app-config.interface'
import {MetadataConfig} from './metadata-config.interface'
import {EnvConfig} from './env-config.interface'
import {PostgresConfig} from './postgres-config.interface'

export const loadEnvConfig = (): EnvConfig => {
  const environment = process.env.ENVIRONMENT || 'development'
  const envFilePath = join(
    'libs',
    'data-infra',
    'config',
    'envs',
    `.env.${environment}.json`,
  )
  return JSON.parse(fs.readFileSync(envFilePath, 'utf8'))
}

export const setupConfig = (): [
  ConfigFactory<TelemetryIngestAppConfig>,
  ConfigFactory<MetadataConfig>,
  ConfigFactory<PostgresConfig>,
] => {
  const envConfig = loadEnvConfig()

  const telemetryIngestAppConfig = registerAs<TelemetryIngestAppConfig>(
    'telemetryIngestApp',
    () => envConfig.telemetryIngestApp,
  )

  const metadataConfig = registerAs<MetadataConfig>(
    'metadata',
    () => envConfig.metadata,
  )

  const postgresConfig = registerAs<PostgresConfig>(
    'postgres',
    () => envConfig.postgres,
  )

  return [telemetryIngestAppConfig, metadataConfig, postgresConfig]
}

export function getConfigOrThrow<T>(
  configService: ConfigService,
  property: string,
): T {
  const config = configService.get<T>(property)
  if (!config)
    throw new Error(
      `Config property not found: ${property}. Check .env.${process.env.ENVIRONMENT}.json`,
    )
  return config
}
