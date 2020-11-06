import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id = 0;

    @Column('text', {nullable: true})
    name = '';

    @Index({ unique: true })
    @Column('text')
    email = '';

    @Column('text')
    password = '';

    @Column('tinyint', {nullable: true})
    isActive = true;

    @Column('datetime', {nullable: true})
    date = new Date();

    @Column('text', {nullable: true})
    role = '';

    @Column('text', {nullable: true})
    imageUrl = '';
}

