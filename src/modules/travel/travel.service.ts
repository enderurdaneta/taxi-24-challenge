import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerService } from '../passenger/passenger.service';
import { DriverService } from '../driver/driver.service';
import { TravelListQueryDto } from './dto/travel-list-query.dto';
import { Driver } from '../driver/entities/driver.entity';
import { Passenger } from '../passenger/entities/passenger.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private travelRepository: Repository<Travel>,
    private readonly passengerService: PassengerService,
    private readonly driverService: DriverService,
  ) {}

  async create(createTravelDto: CreateTravelDto): Promise<Travel> {
    const travel = new Travel();

    const driver = await this.driverService.findOne(createTravelDto.driverUid);
    const passenger = await this.passengerService.findOne(
      createTravelDto.passengerUid,
    );
    travel.driver = driver;
    travel.passenger = passenger;
    travel.addresDestination = createTravelDto.addresDestination;
    travel.addresOrigin = createTravelDto.addresOrigin;
    travel.cost = createTravelDto.cost;
    travel.status = 1;

    return this.travelRepository.save(travel);
  }

  async findAll({
    limit = 50,
    offset = 0,
    active = true,
  }: TravelListQueryDto): Promise<Travel[]> {
    const status = active ? 1 : 2;

    const travels = await this.travelRepository.find({
      where: {
        deletedAt: IsNull(),
        status,
      },
      relations: ['driver', 'passenger'],
      skip: offset,
      take: limit,
    });
    if (travels.length == 0) throw new NotFoundException(`Not found travels.`);
    return travels;
  }

  update(id: number, updateTravelDto: UpdateTravelDto) {
    return `This action updates a #${id} travel`;
  }
}
