import { Injectable, NotFoundException } from '@nestjs/common';
import { Driver } from './entities/driver.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverListQueryDto } from './dto/driver-list-query.dto';

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

  async findAll({ limit, offset }: DriverListQueryDto): Promise<Driver[]> {
    const drivers = await this.driverRepository.find({
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
      where: {
        deletedAt: IsNull(),
      },
      skip: offset,
      take: limit,
    });
    if (drivers.length == 0) throw new NotFoundException(`Not found drivers.`);
    return drivers;
  }
}
