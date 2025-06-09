import { IsUrl } from 'class-validator';

export class CreateBookmarkDto {
    userId: string;
    @IsUrl()
    url: string;
}
