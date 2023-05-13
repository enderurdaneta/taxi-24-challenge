import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class TravelListQueryDto {
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
    example: true,
    description: 'active',
    default: 'true',
  })
  @IsNotEmpty()
  @IsString()
  active: string;
}
