import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('bookmarks')
    getBookmarks(): Array<{ id: number; title: string; url: string }> {
        return this.appService.getBookmarks();
    }
}
