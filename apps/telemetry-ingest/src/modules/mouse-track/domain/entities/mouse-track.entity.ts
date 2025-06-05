import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {EventType} from '../enums/event-type.enum'

@Entity('mouse_track')
export class MouseTrack {
  @PrimaryGeneratedColumn({name: 'id', type: 'int'})
  id: number

  @Column({name: 'user_id', type: 'int', default: null, nullable: true})
  userId?: number

  @Column({name: 'session_id', type: 'varchar', length: '100'})
  sessionId: string

  @Column({name: 'page_url', type: 'text'})
  pageUrl: string

  @Column({name: 'x_coordinate', type: 'int'})
  xCoordinate: number

  @Column({name: 'y_coordinate', type: 'int'})
  yCoordinate: number

  @Column({name: 'view_port_width', type: 'int', nullable: true})
  viewPortWidth?: number

  @Column({name: 'view_port_height', type: 'int', nullable: true})
  viewPortHeight?: number

  @Column({name: 'screen_width', type: 'int', nullable: true})
  screenWidth?: number

  @Column({name: 'screen_height', type: 'int', nullable: true})
  screenHeight?: number

  @Column({name: 'timestamp', type: 'bigint'})
  timestamp: number

  @Column({
    name: 'event_type',
    type: 'enum',
    default: EventType.MOUSE_MOVE,
    enum: EventType,
  })
  eventType: EventType

  @Column({name: 'browser_info', type: 'text'})
  browserInfo: string

  @Column({name: 'device_type', type: 'varchar', length: 50})
  deviceType: string

  @CreateDateColumn({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creationDate: Date

  @UpdateDateColumn({
    name: 'updation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updationDate: Date
}
