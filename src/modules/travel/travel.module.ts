import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { PassengerModule } from '../passenger/passenger.module';
import { DriverModule } from '../driver/driver.module';

@Module({
  controllers: [TravelController],
  providers: [TravelService],
  imports: [TypeOrmModule.forFeature([Travel]), PassengerModule, DriverModule],
})
export class TravelModule {}
