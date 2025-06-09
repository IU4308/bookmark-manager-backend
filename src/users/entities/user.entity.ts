import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @Column({ default: false })
    is_blocked: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    last_login: Date;

    @Column({ default: false })
    is_admin: boolean;
}
