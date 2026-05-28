import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Users, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  // CREATE USER
  async create(fullName: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    const savedUser = await this.userRepository.save(user);

    // remove password before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = savedUser;

    return {
      message: 'User created successfully',
      user: safeUser,
    };
  }

  // GET ALL USERS
  async findAll() {
    const users = await this.userRepository.find();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user);
  }

  // GET USER BY EMAIL
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // GET USER BY ID
  async findById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
