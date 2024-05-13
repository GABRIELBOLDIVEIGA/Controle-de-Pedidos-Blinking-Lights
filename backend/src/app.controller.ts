import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { configuration } from './configuration/configuration';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 2, ttl: 60000 } })
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
