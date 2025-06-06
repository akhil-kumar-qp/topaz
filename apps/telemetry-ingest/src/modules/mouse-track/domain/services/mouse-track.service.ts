import {Injectable} from '@nestjs/common'
import {MouseTrackRepository} from '../repository/mouse-track.repository'
import {MouseTrackIngestDto} from '../../application/dtos/mouse-track-ingest.dto'
import {MouseTrack} from '../entities/mouse-track.entity'
import {EventType} from '../enums/event-type.enum'

@Injectable()
export class MouseTrackService {
  constructor(private readonly mouseTrackRepository: MouseTrackRepository) {}

  async ingestData(mouseTrackIngestDto: MouseTrackIngestDto): Promise<void> {
    await this.mouseTrackRepository.save(
      this.preprocessMouseTrackData(mouseTrackIngestDto),
    )
  }

  private preprocessMouseTrackData(
    mouseTrackIngestDto: MouseTrackIngestDto,
  ): MouseTrack[] {
    const {
      sessionId,
      userId,
      pageUrl,
      viewport,
      screen,
      browserInfo,
      deviceType,
      events,
    } = mouseTrackIngestDto

    return events.map(event => {
      const mouseTrack = new MouseTrack()

      mouseTrack.sessionId = sessionId
      mouseTrack.userId = userId
      mouseTrack.pageUrl = pageUrl
      mouseTrack.xCoordinate = event.x
      mouseTrack.yCoordinate = event.y
      mouseTrack.viewPortWidth = viewport?.width
      mouseTrack.viewPortHeight = viewport?.height
      mouseTrack.screenWidth = screen?.width
      mouseTrack.screenHeight = screen?.height
      mouseTrack.timestamp = event.timestamp
      mouseTrack.eventType = event.eventType || EventType.MOUSE_MOVE
      mouseTrack.browserInfo = browserInfo
      mouseTrack.deviceType = deviceType

      return mouseTrack
    })
  }
}
