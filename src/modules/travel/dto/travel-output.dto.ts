import { ApiProperty } from '@nestjs/swagger';
import { DriverOutputDto } from 'src/modules/driver/dto/driver-output.dto';
import { Travel } from '../entities/travel.entity';
import { PassengerOutputDto } from 'src/modules/passenger/dto/passenger-output.dto';

export class TravelOutputDto {
  constructor(data: Travel) {
    this.uid = data.uid;
    this.addresOrigin = data.addresOrigin;
    this.addresDestination = data.addresDestination;
    this.cost = data.cost;
    this.status = data.status;
    this.driver = new DriverOutputDto(data.driver);
    this.passenger = new PassengerOutputDto(data.passenger);
  }

  @ApiProperty({
    example: '90d80c52-e26f-4478-ad14-cb364910ffef',
    description: 'uid',
  })
  uid: string;

  @ApiProperty({
    example: 'Cra 98#9s-34, Poblado, Medellin',
    description: 'addresOrigin',
  })
  addresOrigin: string;

  @ApiProperty({
    example: 'Cra 36#147-325, Poblado, Medellin',
    description: 'addresDestination',
  })
  addresDestination: string;

  @ApiProperty({
    example: '10000',
    description: 'cost',
  })
  cost: number;

  @ApiProperty({
    example: '1',
    description: 'status',
  })
  status: number;

  @ApiProperty({ type: DriverOutputDto })
  driver: DriverOutputDto;

  @ApiProperty({ type: PassengerOutputDto })
  passenger: PassengerOutputDto;
}
