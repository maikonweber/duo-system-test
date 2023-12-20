import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByUsernamePassword(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });
  }
  async getUserAndPassword(username: any, password: any) {
    return { username: 'Maikon', password: '12345679' };
  }
}
