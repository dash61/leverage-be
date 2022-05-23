import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;
  
  @Column({
    nullable: false,
    default: '',
  })
  userName: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  userEmail: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;
}
