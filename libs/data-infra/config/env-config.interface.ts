import {TelemetryIngestAppConfig} from './telemetry-ingest-app-config.interface'
import {MetadataConfig} from './metadata-config.interface'

export interface EnvConfig {
  telemetryIngestApp: TelemetryIngestAppConfig
  metadata: MetadataConfig
}
