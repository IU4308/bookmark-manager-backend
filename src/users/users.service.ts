// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async create(data: CreateUserDto): Promise<User> {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, data);
        return this.userRepo.save(user);
    }

    async remove(id: string): Promise<void> {
        const result = await this.userRepo.delete(id);
        if (result.affected === 0)
            throw new NotFoundException('User not found');
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOneBy({ email });
    }
}
