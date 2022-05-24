import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";

import { User } from '../typeorm';
import { CreateUserDto } from './CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const users = await this.userRepository.find();
    if (users) {
      for (const oneUser of Object.values(users)) {
        if (oneUser.userName === createUserDto.userName &&
          oneUser.userEmail === createUserDto.userEmail) {
          throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
      }
    }

    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;

    // Save user token
    const newUser: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async findUsersById(id: number) {
    return this.userRepository.findOne(id);
  }

  async findUsersByName(name: string) {
    return this.userRepository.findOne({userName: name});
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
