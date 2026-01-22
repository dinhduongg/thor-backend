import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class GlobalHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse()
    response.setHeader('Content-Type', 'application/json; charset=utf-8')

    return next.handle().pipe(
      tap(() => {
        // You can add more headers here if needed
      }),
    )
  }
}
