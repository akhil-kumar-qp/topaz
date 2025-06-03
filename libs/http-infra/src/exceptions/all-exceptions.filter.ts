import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  ExceptionFilter,
} from '@nestjs/common'
import {HttpAdapterHost} from '@nestjs/core'
import {Response} from 'express'
import {ResponseUtil} from '../utils/response.util'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name)
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const {httpAdapter} = this.httpAdapterHost
    this.logger.debug('exception', exception)
    if (process.env.ENVIRONMENT !== 'test') {
      this.logger.error(exception)
    }

    const ctx = host.switchToHttp()

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let data = undefined

    if (exception instanceof HttpException) {
      data = exception.getResponse() as object
    } else if ((exception as Record<string, string>).code === 'EBADCSRFTOKEN') {
      httpStatus = 403
    }

    const responseBody = ResponseUtil.error(exception.message, data)

    if (ctx.getResponse<Response>().headersSent) {
      return
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
