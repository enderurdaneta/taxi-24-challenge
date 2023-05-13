import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class DriverListQueryDto {
  @ApiProperty({
    example: 50,
    description: 'limit',
    minimum: 1,
    exclusiveMinimum: true,
    format: 'int32',
    default: 50,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  @ApiProperty({
    example: 0,
    description: 'offset',
    minimum: 0,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  offset: number;

  @ApiProperty({
    example: 'true',
    description: 'available',
    default: null,
    required: false,
  })
  @IsString()
  @IsOptional()
  available: string;
}
