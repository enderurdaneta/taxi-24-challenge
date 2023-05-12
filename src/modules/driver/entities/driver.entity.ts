import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('Driver')
@Unique(['documentTypeId', 'documentNumber'])
export class Driver {
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

  @Column()
  brand: string;

  @Column()
  licensePlate: string;

  @Column()
  color: string;

  @Column()
  capacity: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
