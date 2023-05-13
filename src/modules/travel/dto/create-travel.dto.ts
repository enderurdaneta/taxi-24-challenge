import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
export class CreateTravelDto {
  @ApiProperty({
    example: '21a33761-c18e-41ae-b735-e9848da1fd11',
    description: 'driverUid',
  })
  @IsUUID()
  driverUid: string;

  @ApiProperty({
    example: '3895cfdb-47a1-4bcf-8bd5-9e287a576bd2',
    description: 'passengerUid',
  })
  @IsUUID()
  passengerUid: string;

  @ApiProperty({
    example: 'Cra 98#9s-34, Poblado, Medellin',
    description: 'addresOrigin',
  })
  @IsString()
  addresOrigin: string;

  @ApiProperty({
    example: 'Cra 36#147-325, Poblado, Medellin',
    description: 'addresDestination',
  })
  @IsString()
  addresDestination: string;

  @ApiProperty({
    example: '10000',
    description: 'cost',
  })
  @IsNumber()
  @IsPositive()
  cost: number;
}
