import {Module} from '@nestjs/common'
import {TelemetryIngestController} from './telemetry-ingest.controller'
import {TelemetryIngestService} from './telemetry-ingest.service'
import {APP_FILTER, APP_PIPE} from '@nestjs/core'
import {AllExceptionsFilter} from '@lib/http-infra/exceptions/all-exceptions.filter'
import {setupValidationPipe} from '@lib/http-infra/exceptions/setup-validation-pipe.method'
import {ConfigModule} from '@nestjs/config'
import {setupConfig} from 'libs/data-infra/config/setup-config.method'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: setupConfig(),
      isGlobal: true,
    }),
  ],
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
