import {Controller, Get} from '@nestjs/common'
import {TelemetryIngestService} from './telemetry-ingest.service'
import {SuccessResponse} from '@lib/http-infra/response/success-response.interface'
import {ResponseUtil} from '@lib/http-infra/utils/response.util'

@Controller()
export class TelemetryIngestController {
  constructor(
    private readonly telemetryIngestService: TelemetryIngestService,
  ) {}

  @Get()
  getHello(): SuccessResponse<string> {
    return ResponseUtil.success(this.telemetryIngestService.getHello())
  }
}
