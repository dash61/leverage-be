import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateContactDto } from "./CreateContact.dto";
import { ContactsService } from "./contacts.service";
import { Contact } from '../typeorm';


@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  getContacts() {
    return this.contactsService.getContacts();
  }

  @Get('id/:id')
  async findContactById(@Param("id", ParseIntPipe) id: number) {
    return this.contactsService.findContactById(id);
  }

  @Get('user/:id')
  getContactsForUser(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.getContactsForUser(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  @Delete('id/:id')
  async delete(@Param("id") id: number): Promise<string> {
    this.contactsService.delete(id);
    return `deleted old contact = ${id}`;
  }
}
