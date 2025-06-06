import {Module} from '@nestjs/common'
import {MouseTrackRepository} from './domain/repository/mouse-track.repository'
import {MouseTrackService} from './domain/services/mouse-track.service'
import {MouseTrackController} from './application/controllers/mouse-track.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {getDataSource} from '@lib/data-infra/modules/postgres/domain/utils/datasource.util'
import {MouseTrack} from './domain/entities/mouse-track.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MouseTrack], getDataSource())],
  controllers: [MouseTrackController],
  providers: [MouseTrackService, MouseTrackRepository],
})
export class MouseTrackModule {}
