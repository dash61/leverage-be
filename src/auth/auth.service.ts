import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUsersByName(username);
    const encryptedPassword = await bcrypt.hash(pass, 10);
    const pswdCheck = await bcrypt.compare(pass, encryptedPassword);

    if (user && pswdCheck) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.id };
    const data = this.jwtService.sign(payload, { secret: process.env.TOKEN_KEY });
    return {
      access_token: data,
      user,
    };
  }
}
