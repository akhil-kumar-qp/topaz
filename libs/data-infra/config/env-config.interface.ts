import {TelemetryIngestAppConfig} from './telemetry-ingest-app-config.interface'
import {MetadataConfig} from './metadata-config.interface'
import {PostgresConfig} from './postgres-config.interface'

export interface EnvConfig {
  telemetryIngestApp: TelemetryIngestAppConfig
  metadata: MetadataConfig
  postgres: PostgresConfig
}
