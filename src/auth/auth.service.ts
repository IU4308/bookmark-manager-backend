// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return { id: user.id, email: user.email };
        }
        throw new UnauthorizedException();
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });
        return { id: user.id, email: user.email };
    }
}
