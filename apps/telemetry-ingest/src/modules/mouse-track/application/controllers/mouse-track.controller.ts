import {Body, Controller, Post} from '@nestjs/common'
import {MouseTrackService} from '../../domain/services/mouse-track.service'
import {MouseTrackIngestDto} from '../dtos/mouse-track-ingest.dto'
import {SuccessResponse} from '@lib/http-infra/response/success-response.interface'
import {ResponseUtil} from '@lib/http-infra/utils/response.util'

@Controller('mouse-track')
export class MouseTrackController {
  constructor(private readonly mouseTrackService: MouseTrackService) {}

  @Post('/ingest')
  async ingestMouseTrackData(
    @Body() mouseTrackIngestDto: MouseTrackIngestDto,
  ): Promise<SuccessResponse<string>> {
    this.mouseTrackService.ingestData(mouseTrackIngestDto)
    return ResponseUtil.success('Data ingested successfully')
  }
}
