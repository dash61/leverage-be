import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // access .env values via ConfigService
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import entities from './typeorm';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true, // don't use this in production
      }),
      inject: [ConfigService],
    }),
    ContactsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
