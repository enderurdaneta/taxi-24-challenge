import { ApiProperty } from '@nestjs/swagger';
import { Passenger } from '../entities/passenger.entity';

export class PassengerOutputDto {
  constructor(data: Passenger) {
    this.uid = data.uid;
    this.documentTypeId = data.documentTypeId;
    this.documentNumber = data.documentNumber;
    this.firtName = data.firtName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
  }

  @ApiProperty({
    example: '90d80c52-e26f-4478-ad14-cb364910ffef',
    description: 'uid',
  })
  uid: string;

  @ApiProperty({
    example: 1,
    description: 'documentTypeId',
  })
  documentTypeId: number;

  @ApiProperty({
    example: 1040322,
    description: 'documentNumber',
  })
  documentNumber: number;

  @ApiProperty({
    example: 'Ender',
    description: 'firtName',
  })
  firtName: string;

  @ApiProperty({
    example: 'Urdaneta',
    description: 'lastName',
  })
  lastName: string;

  @ApiProperty({
    example: 'urdanetaenderjose@gmail.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 3224113131,
    description: 'phone',
  })
  phone: string;
}
