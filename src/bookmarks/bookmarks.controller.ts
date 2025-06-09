import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) {}

    @Get()
    getBookmarks(): Array<{ id: number; title: string; url: string }> {
        return this.bookmarksService.getBookmarks();
    }

    @Post()
    create(@Body() dto: CreateBookmarkDto, @Req() req) {
        return this.bookmarksService.create(dto, req.user.userId);
    }
}
