import {IsInt} from 'class-validator'

export class ViewPortMetaDto {
  @IsInt()
  width: number

  @IsInt()
  height: number
}
