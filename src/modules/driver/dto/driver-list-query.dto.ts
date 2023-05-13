import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsBoolean } from 'class-validator';

export class DriverListQueryDto {
  @ApiProperty({
    minimum: 1,
    exclusiveMinimum: true,
    format: 'int32',
    default: 50,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit = 50;

  @ApiProperty({
    minimum: 0,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  offset = 0;

  @ApiProperty({
    example: true,
    description: 'available',
    default: null,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  available: boolean;
}
