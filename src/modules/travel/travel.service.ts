import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerService } from '../passenger/passenger.service';
import { DriverService } from '../driver/driver.service';

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

  findAll() {
    return `This action returns all travel`;
  }

  update(id: number, updateTravelDto: UpdateTravelDto) {
    return `This action updates a #${id} travel`;
  }
}
