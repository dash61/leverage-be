import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  contactName: string;

  @Column({
    nullable: false,
    default: '',
    name: 'email_address',
  })
  contactEmail: string;

  @Column({
    nullable: false,
    default: '',
    name: 'phone_number',
  })
  contactPhone: string;
}
