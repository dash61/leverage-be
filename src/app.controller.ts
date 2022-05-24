import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // req has user: { id: '18', userName: 'John Doe', userEmail: 'john@gmail.com' }
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
