import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
export class CreateTravelDto {
  @ApiProperty({
    example: '90d80c52-e26f-4478-ad14-cb364910ffef',
    description: 'driverUid',
  })
  @IsUUID()
  driverUid: string;

  @ApiProperty({
    example: '90d80c52-e26f-4478-ad14-cb364910ffef',
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
