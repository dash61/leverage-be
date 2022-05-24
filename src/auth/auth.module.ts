import { Module, forwardRef } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config'; // access .env values via ConfigService

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { User } from "../typeorm/user.entity";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("TOKEN_KEY"),
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtService, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {}
