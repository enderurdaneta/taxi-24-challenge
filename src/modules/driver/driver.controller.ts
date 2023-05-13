import {
  Controller,
  Get,
  HttpStatus,
  Param,
  HttpCode,
  ParseUUIDPipe,
  Logger,
  Query,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseErrorDto } from 'src/common/response.dto';
import { DriverOutputDto } from './dto/driver-output.dto';
import catchError from 'src/common/catch-error';
import { DriverListQueryDto } from './dto/driver-list-query.dto';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  private readonly logger = new Logger(DriverController.name);
  constructor(private readonly driverService: DriverService) {}

  @Get(':uid')
  @ApiOperation({ summary: 'Get driver for uid.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: DriverOutputDto,
    description: 'Signer get successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ResponseErrorDto,
    description: 'Internal server error',
  })
  async findOne(
    @Param('uid', new ParseUUIDPipe()) uid: string,
  ): Promise<DriverOutputDto> {
    try {
      const response = await this.driverService.findOne(uid);
      return new DriverOutputDto(response);
    } catch (error) {
      catchError(this.logger, error, 'findOne', 'GET driver/:uid');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get drivers list.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [DriverOutputDto],
    description: 'Signer get successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ResponseErrorDto,
    description: 'Internal server error',
  })
  async findAll(
    @Query() queryParam: DriverListQueryDto,
  ): Promise<Array<DriverOutputDto>> {
    try {
      if (queryParam.available === 'true') {
        return await this.driverService.findAllAvailable(queryParam);
      } else {
        return await this.driverService.findAll(queryParam);
      }
    } catch (error) {
      catchError(this.logger, error, 'findAll', 'GET driver/');
    }
  }
}
