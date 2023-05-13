import { Injectable, NotFoundException } from '@nestjs/common';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all driver`;
  }
}
