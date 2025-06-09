import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import * as metascraper from 'metascraper';
const metascraperTitle = require('metascraper-title');
const metascraperImage = require('metascraper-image');

import axios from 'axios';

@Injectable()
export class BookmarksService {
    bookmarks: Array<{ id: number; title: string; url: string }> = [
        { id: 1, title: 'Angular', url: 'https://angular.io' },
        { id: 2, title: 'Tailwind CSS', url: 'https://tailwindcss.com' },
        { id: 3, title: 'Netlify', url: 'https://netlify.com' },
        { id: 4, title: 'Vercel', url: 'https://vercel.com' },
        { id: 5, title: 'GitHub', url: 'https://github.com' },
        { id: 6, title: 'Youtube', url: 'https://youtube.com' },
    ];
    constructor(
        @InjectRepository(Bookmark)
        private readonly bookmarkRepo: Repository<Bookmark>
    ) {}

    getBookmarks(): Array<{ id: number; title: string; url: string }> {
        console.log('Fetching bookmarks');
        return this.bookmarks;
    }

    async create(createDto: CreateBookmarkDto, userId: string) {
        const { url } = createDto;

        console.log(createDto, userId);

        const html = await this.fetchHtml(url);
        const metadata = await this.extractMetadata(html, url);

        console.log('Extracted metadata:', metadata);

        const bookmark = this.bookmarkRepo.create({
            url,
            title: metadata.title,
            image: metadata.image,
            userId,
        });

        return this.bookmarkRepo.save(bookmark);
    }

    private async fetchHtml(url: string): Promise<string> {
        try {
            console.log('Fetching HTML from URL:', url);
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                        'Chrome/114.0.0.0 Safari/537.36',
                },
            });
            return data;
        } catch (e) {
            throw new BadRequestException('Failed to fetch the page');
        }
    }

    private async extractMetadata(html: string, url: string) {
        const scraper = metascraper([metascraperTitle(), metascraperImage()]);

        return scraper({ html, url });
    }
}
