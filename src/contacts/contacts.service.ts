import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact } from '../typeorm';
import { CreateContactDto } from './CreateContact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const exisitingContact = await this.findContactByParams(createContactDto);
    if (exisitingContact) {
      throw new BadRequestException('Contact already exists');
    }
    const newContact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(newContact);
  }

  async getContacts() {
    return await this.contactRepository.find();
  }

  async getContactsForUser(id: number) {
    const result = await this.contactRepository
      .createQueryBuilder('contacts')
      .select('contacts.contactName', 'contactName')
      .addSelect('contacts.contactEmail', 'contactEmail')
      .addSelect('contacts.contactPhone', 'contactPhone')
      .addSelect('contacts.id', 'id')
      .innerJoin('user', 'usr', `${id}=contacts.user.id`)
      .distinct()
      .printSql() 
      .getRawMany();
    return result;
  }


  async findContactById(id: number) {
    return await this.contactRepository.findByIds([id]);
  }

  async findContactByParams(data: CreateContactDto) {
    return await this.contactRepository.findOne({
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
    });
  }

  async delete(id: number) {
    return await this.contactRepository.delete(id);
  }
}
