import { Controller, Get } from '@nestjs/common';
import { TelemetryIngestService } from './telemetry-ingest.service';

@Controller()
export class TelemetryIngestController {
  constructor(private readonly telemetryIngestService: TelemetryIngestService) {}

  @Get()
  getHello(): string {
    return this.telemetryIngestService.getHello();
  }
}
