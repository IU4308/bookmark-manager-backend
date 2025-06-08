import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    bookmarks: Array<{ id: number; title: string; url: string }> = [
        { id: 1, title: 'Angular', url: 'https://angular.io' },
        { id: 2, title: 'Tailwind CSS', url: 'https://tailwindcss.com' },
        { id: 3, title: 'Netlify', url: 'https://netlify.com' },
        { id: 4, title: 'Vercel', url: 'https://vercel.com' },
        { id: 5, title: 'GitHub', url: 'https://github.com' },
        { id: 6, title: 'Youtube', url: 'https://youtube.com' },
    ];

    getHello(): string {
        return 'Hello World!';
    }

    getBookmarks(): Array<{ id: number; title: string; url: string }> {
        console.log('Fetching bookmarks');
        return this.bookmarks;
    }
}
