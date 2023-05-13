import { Injectable, NotFoundException } from '@nestjs/common';
import { Passenger } from './entities/passenger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  async findOne(uid: string): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({
      where: { uid },
    });
    if (!passenger) throw new NotFoundException(`Not found passenger ${uid}.`);
    return passenger;
  }

  async findAll(): Promise<Passenger[]> {
    const passengers = await this.passengerRepository.find({
      where: {
        deletedAt: IsNull(),
      },
      select: [
        'uid',
        'documentTypeId',
        'documentNumber',
        'firtName',
        'lastName',
        'email',
        'phone',
      ],
    });
    if (passengers.length == 0)
      throw new NotFoundException(`Not found passengers.`);
    return passengers;
  }
}
