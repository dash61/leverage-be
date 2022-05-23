import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from 'src/contacts/CreateContact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    const newContact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(newContact);
  }

  getContacts() {
    return this.contactRepository.find();
  }

  findContactById(id: number) {
    return this.contactRepository.findByIds([id]);
  }

  delete(id: number) {
    return this.contactRepository.delete(id);
  }
}
