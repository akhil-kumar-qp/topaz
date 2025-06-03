import {ErrorResponse} from '../response/error-response.interface'
import {SuccessResponse} from '../response/success-response.interface'

export class ResponseUtil {
  static success<T>(data: T): SuccessResponse<T> {
    return {
      data,
    }
  }

  static error(message: string, data: object | undefined): ErrorResponse {
    return {
      message,
      data,
    }
  }
}
