import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(
            body.email,
            body.password
        );
        return this.authService.login(user);
    }

    @Post('register')
    async register(
        @Body() body: { name: string; email: string; password: string }
    ) {
        const user = await this.authService.register(
            body.name,
            body.email,
            body.password
        );
        return this.authService.login({ id: user.id, email: user.email });
    }
}
