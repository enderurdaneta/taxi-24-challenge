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

  async findAll({
    limit = 50,
    offset = 0,
  }: DriverListQueryDto): Promise<Driver[]> {
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

  async findAllAvailable({
    limit = 50,
    offset = 0,
  }: DriverListQueryDto): Promise<Driver[]> {
    const drivers = await this.driverRepository.manager.query(`
    SELECT
      "uid",
      "documentTypeId",
      "documentNumber",
      "firtName",
      "lastName",
      "email",
      "phone",
      "brand",
      "licensePlate",
      "color",
      "capacity"
    FROM "Driver"
    WHERE "deletedAt" is null
      AND id not in (
        SELECT "driverId" FROM "Travel"
        WHERE "deletedAt" is null
        AND "status" = 1)
    LIMIT ${limit} OFFSET ${offset};
        `);
    if (drivers.length == 0) throw new NotFoundException(`Not found drivers.`);
    return drivers;
  }
}
