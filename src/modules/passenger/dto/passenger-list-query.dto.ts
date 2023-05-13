import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PassengerListQueryDto {
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
  limit = 50;

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
  offset = 0;
}
