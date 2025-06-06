import {IsInt} from 'class-validator'

export class ScreenMetaDto {
  @IsInt()
  width: number

  @IsInt()
  height: number
}
