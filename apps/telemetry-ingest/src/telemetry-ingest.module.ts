import {Module} from '@nestjs/common'
import {TelemetryIngestController} from './telemetry-ingest.controller'
import {TelemetryIngestService} from './telemetry-ingest.service'
import {APP_FILTER, APP_PIPE} from '@nestjs/core'
import {AllExceptionsFilter} from '@lib/http-infra/exceptions/all-exceptions.filter'
import {setupValidationPipe} from '@lib/http-infra/exceptions/setup-validation-pipe.method'
import {DataInfraModule} from 'libs/data-infra/data-infra.module'
import {MouseTrackModule} from './modules/mouse-track/mouse-track.module'

@Module({
  imports: [DataInfraModule, MouseTrackModule],
  controllers: [TelemetryIngestController],
  providers: [
    TelemetryIngestService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: setupValidationPipe(),
    },
  ],
})
export class TelemetryIngestModule {}
