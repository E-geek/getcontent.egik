import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, ILoadPageResponse } from './app.service';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/load')
  async loadPage(@Body('url') url: string): Promise<ILoadPageResponse> {
    return this.appService.loadPage(url);
  }
}
