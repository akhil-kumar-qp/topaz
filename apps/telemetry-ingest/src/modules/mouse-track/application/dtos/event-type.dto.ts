import {IsEnum, IsInt, IsOptional} from 'class-validator'
import {EventType} from '../../domain/enums/event-type.enum'

export class EventTypeDto {
  @IsInt()
  x: number

  @IsInt()
  y: number

  @IsInt()
  timestamp: number

  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType
}
