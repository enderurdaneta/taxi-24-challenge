import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
  imports: [TypeOrmModule.forFeature([Driver])],
  exports: [DriverService],
})
export class DriverModule {}
