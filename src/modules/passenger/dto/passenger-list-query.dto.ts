import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PassengerListQueryDto {
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
}
