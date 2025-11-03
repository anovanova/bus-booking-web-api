import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export type User = any;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private configService: ConfigService,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  findOne(username: string): User {
    return this.users.find((user) => user.username === username);
  }

  async createAdminUser(): Promise<Users> {
    const hashedPassword = await bcrypt.hash(
      this.configService.get<string>('ADMIN_PASSWORD')!,
      parseInt(this.configService.get<string>('SALT')!),
    );
    const adminUser = this.usersRepository.create({
      username: this.configService.get<string>('ADMIN_USERNAME'),
      firstname: this.configService.get<string>('ADMIN_FIRSTNAME'),
      lastname: this.configService.get<string>('ADMIN_LASTNAME'),
      password: hashedPassword,
      role: 'superadmin',
      activated: true,
    });
    return this.usersRepository.save(adminUser);
  }
}
