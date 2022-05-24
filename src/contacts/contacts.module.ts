import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../typeorm';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';


@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactsController],
  providers: [ContactsService]
})

export class ContactsModule {}
