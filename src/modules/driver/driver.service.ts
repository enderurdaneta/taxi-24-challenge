import { Injectable, NotFoundException } from '@nestjs/common';
import { Driver } from './entities/driver.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async findOne(uid: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: { uid },
    });
    if (!driver) throw new NotFoundException(`Not found driver ${uid}.`);
    return driver;
  }

  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverRepository.find({
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
        'brand',
        'licensePlate',
        'color',
        'capacity',
      ],
    });
    if (drivers.length == 0) throw new NotFoundException(`Not found drivers.`);
    return drivers;
  }
}
