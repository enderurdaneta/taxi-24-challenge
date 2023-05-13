import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../entities/driver.entity';

export class DriverOutputDto {
  constructor(data: Driver) {
    this.uid = data.uid;
    this.documentTypeId = data.documentTypeId;
    this.documentNumber = data.documentNumber;
    this.firtName = data.firtName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.brand = data.brand;
    this.licensePlate = data.licensePlate;
    this.color = data.color;
    this.capacity = data.capacity;
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

  @ApiProperty({
    example: 'Chevrolet Aveo Gt Emotion',
    description: 'brand',
  })
  brand: string;

  @ApiProperty({
    example: 'L54I844',
    description: 'licensePlate',
  })
  licensePlate: string;

  @ApiProperty({
    example: 'Gris',
    description: 'color',
  })
  color: string;

  @ApiProperty({
    example: 4,
    description: 'capacity',
  })
  capacity: number;
}
