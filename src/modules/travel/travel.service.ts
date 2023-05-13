import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { Travel } from './entities/travel.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerService } from '../passenger/passenger.service';
import { DriverService } from '../driver/driver.service';
import { TravelListQueryDto } from './dto/travel-list-query.dto';

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

    // valid availability
    const travelCurrent = await this.travelRepository.findOne({
      where: {
        deletedAt: IsNull(),
        status: 1,
        driver: { uid: createTravelDto.driverUid },
        passenger: { uid: createTravelDto.passengerUid },
      },
    });
    if (travelCurrent)
      throw new BadRequestException(`Driver or passenger not available.`);

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
    active,
  }: TravelListQueryDto): Promise<Travel[]> {
    const status: number = active === 'true' ? 1 : 2;

    const travels = await this.travelRepository.find({
      where: {
        deletedAt: IsNull(),
        status: status,
      },
      relations: ['driver', 'passenger'],
      skip: offset,
      take: limit,
    });
    if (travels.length == 0) throw new NotFoundException(`Not found travels.`);
    return travels;
  }

  async completed(uid: string) {
    const travel = await this.travelRepository.findOne({
      where: { uid },
    });
    if (!travel) throw new NotFoundException(`Not found travel ${uid}.`);
    travel.status = 2;
    return this.travelRepository.save(travel);
  }
}
