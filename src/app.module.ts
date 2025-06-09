import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookmarksController } from './bookmarks/bookmarks.controller';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
            autoLoadEntities: true,
            synchronize: false,
        }),
        UsersModule,
        AuthModule,
        BookmarksModule,
    ],
    controllers: [AppController, BookmarksController],
    providers: [AppService],
})
export class AppModule {}
