import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import { HealthCheckService } from './health-check.service'

@Controller({ path: 'health-check', version: VERSION_NEUTRAL })
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async check() {
    return this.healthCheckService.check()
  }
}
