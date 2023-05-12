import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverService {
  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  findAll() {
    return `This action returns all driver`;
  }
}
