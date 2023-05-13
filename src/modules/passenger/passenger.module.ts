import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { Passenger } from './entities/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService],
  imports: [TypeOrmModule.forFeature([Passenger])],
  exports: [PassengerService],
})
export class PassengerModule {}
