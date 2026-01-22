import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthCheckService {
  async check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
