import { Module } from '@nestjs/common';
import { TelemetryIngestController } from './telemetry-ingest.controller';
import { TelemetryIngestService } from './telemetry-ingest.service';

@Module({
  imports: [],
  controllers: [TelemetryIngestController],
  providers: [TelemetryIngestService],
})
export class TelemetryIngestModule {}
