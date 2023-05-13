import { Driver } from '../../../modules/driver/entities/driver.entity';
import { Passenger } from '../../../modules/passenger/entities/passenger.entity';
import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('Travel')
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uid: string;

  @ManyToOne(() => Driver)
  driver: Driver;

  @ManyToOne(() => Passenger)
  passenger: Passenger;

  @Column()
  addresOrigin: string;

  @Column()
  addresDestination: string;

  @Column()
  cost: number;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
