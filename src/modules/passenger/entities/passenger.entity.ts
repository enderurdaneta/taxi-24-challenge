import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('Passenger')
@Unique(['documentTypeId', 'documentNumber'])
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uid: string;

  @Column()
  documentTypeId: number;

  @Column()
  documentNumber: number;

  @Column()
  firtName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
