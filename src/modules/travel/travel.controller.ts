import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  HttpCode,
  Body,
  Patch,
  Logger,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import catchError from 'src/common/catch-error';
import { ResponseErrorDto } from 'src/common/response.dto';
import { TravelOutputDto } from './dto/travel-output.dto';

@ApiTags('Travel')
@Controller('travel')
export class TravelController {
  private readonly logger = new Logger(TravelController.name);
  constructor(private readonly travelService: TravelService) {}

  @Post()
  @ApiOperation({ summary: 'create travel.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TravelOutputDto,
    description: 'Signer get successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ResponseErrorDto,
    description: 'Internal server error',
  })
  async create(@Body() createTravelDto: CreateTravelDto) {
    try {
      const response = await this.travelService.create(createTravelDto);
      return new TravelOutputDto(response);
    } catch (error) {
      catchError(this.logger, error, 'create', 'POST travel/');
    }
  }

  @Get()
  findAllActive() {
    return this.travelService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(+id, updateTravelDto);
  }
}
