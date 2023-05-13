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
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import catchError from 'src/common/catch-error';
import { ResponseErrorDto } from 'src/common/response.dto';
import { TravelOutputDto } from './dto/travel-output.dto';
import { TravelListQueryDto } from './dto/travel-list-query.dto';

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
  async create(
    @Body() createTravelDto: CreateTravelDto,
  ): Promise<TravelOutputDto> {
    try {
      const response = await this.travelService.create(createTravelDto);
      return new TravelOutputDto(response);
    } catch (error) {
      catchError(this.logger, error, 'create', 'POST travel/');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get travel list.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [TravelOutputDto],
    description: 'Signer get successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ResponseErrorDto,
    description: 'Internal server error',
  })
  async findAll(
    @Query() queryParam: TravelListQueryDto,
  ): Promise<Array<TravelOutputDto>> {
    const travels = await this.travelService.findAll(queryParam);
    return travels.map((travel) => new TravelOutputDto(travel));
  }

  @Patch(':uid')
  @ApiOperation({ summary: 'Completed travel.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: TravelOutputDto,
    description: 'Signer get successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ResponseErrorDto,
    description: 'Internal server error',
  })
  update(@Param('uid', new ParseUUIDPipe()) uid: string) {
    return this.travelService.completed(uid);
  }
}
