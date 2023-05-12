import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';

@Module({
  controllers: [TravelController],
  providers: [TravelService],
  imports: [TypeOrmModule.forFeature([Travel])],
})
export class TravelModule {}
