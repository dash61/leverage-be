import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {User} from "./user.entity"; 

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    name: 'contactName',
  })
  contactName: string;

  @Column({
    nullable: false,
    default: '',
    name: 'contactEmail',
  })
  contactEmail: string;

  @Column({
    nullable: false,
    default: '',
    name: 'contactPhone',
  })
  contactPhone: string;

  @Column({
    nullable: false,
    default: 0,
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })//, createForeignKeyConstraints: false
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @ManyToOne(() => User, (user: User) => 
  //   user.contacts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })//, createForeignKeyConstraints: false
  // @JoinColumn({ name: 'user_id' })
  // user: User;
}
