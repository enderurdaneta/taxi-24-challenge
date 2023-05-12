import { Controller, Get, Param } from '@nestjs/common';
import { DriverService } from './driver.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }
}
