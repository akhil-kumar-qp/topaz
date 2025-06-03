import {Injectable} from '@nestjs/common'

@Injectable()
export class TelemetryIngestService {
  getHello(): string {
    return `Hello From ${TelemetryIngestService.name}`
  }
}
