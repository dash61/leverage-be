import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/CreateUser.dto';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const users = await this.userRepository.find();
    console.log("createUser - users=", users);
    if (users) {
      for (const oneUser of Object.values(users)) {
        console.log("oneUser=", oneUser);
        if (oneUser.userName === createUserDto.userName &&
            oneUser.userEmail === createUserDto.userEmail) {
          console.log("user already exists, exiting");
          throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
      }
    }

    // also: await bcrypt.compare(password, user.password)
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;
    // Create token
    const token = jwt.sign(
      { user: createUserDto.userName, email: createUserDto.userEmail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    createUserDto.token = token;
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    console.log("getUsers");
    return this.userRepository.find();
  }

  findUsersById(id: number) {
    return this.userRepository.findOne(id);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
