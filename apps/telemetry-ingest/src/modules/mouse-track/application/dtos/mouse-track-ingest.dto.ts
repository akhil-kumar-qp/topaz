import {Type} from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator'
import {ViewPortMetaDto} from './view-port-meta.dto'
import {ScreenMetaDto} from './screen-meta.dto'
import {EventTypeDto} from './event-type.dto'
import {DeviceType} from '../../domain/enums/device-type.enum'

export class MouseTrackIngestDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string

  @IsOptional()
  @IsInt()
  userId?: number

  @IsUrl()
  pageUrl: string

  @ValidateNested()
  @Type(() => ViewPortMetaDto)
  viewport: ViewPortMetaDto

  @ValidateNested()
  @Type(() => ScreenMetaDto)
  screen: ScreenMetaDto

  @IsString()
  browserInfo: string

  @IsEnum(DeviceType)
  deviceType: DeviceType

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => EventTypeDto)
  events: EventTypeDto[]
}
