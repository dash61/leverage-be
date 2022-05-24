import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contact } from "./contact.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;
  
  @Column({
    name: 'userName',
    nullable: false,
    default: '',
  })
  userName: string;

  @Column({
    name: 'userEmail',
    nullable: false,
    default: '',
  })
  userEmail: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @OneToMany(() => Contact, (contact: Contact) => 
    contact.contactEmail, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  contacts: Contact[];
}
