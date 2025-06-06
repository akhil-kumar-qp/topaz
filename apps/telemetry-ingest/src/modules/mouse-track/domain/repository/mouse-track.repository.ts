import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {MouseTrack} from '../entities/mouse-track.entity'
import {getDataSource} from '@lib/data-infra/modules/postgres/domain/utils/datasource.util'

@Injectable()
export class MouseTrackRepository {
  constructor(
    @InjectRepository(MouseTrack, getDataSource())
    private readonly mouseTrackRepository: Repository<MouseTrack>,
  ) {}

  async save(mouseTracks: MouseTrack[]): Promise<void> {
    await this.mouseTrackRepository.save(mouseTracks)
  }
}
