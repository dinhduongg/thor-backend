import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, UnprocessableEntityException } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.BAD_REQUEST
    let message = 'Bad Request Exception'
    let errorObj: Record<string, any> = {}

    if (exception instanceof UnprocessableEntityException) {
      status = exception.getStatus() // 422
      const res = exception.getResponse() as any

      // Nếu đã format từ exceptionFactory → lấy trực tiếp
      if (res?.message && res?.error) {
        message = res.message
        errorObj = res.error
      } else {
        message = res?.message || exception.message
        errorObj = res || { message: exception.message }
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.name
      errorObj = { message: exception.message }
    } else if (exception instanceof Error) {
      message = exception.name
      errorObj = { message: exception.message }
    }

    response.status(status).json({
      status,
      endPoint: request.url,
      error: errorObj,
      message,
    })
  }
}
