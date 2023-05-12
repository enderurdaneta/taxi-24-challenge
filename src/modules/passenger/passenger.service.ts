import { Injectable } from '@nestjs/common';

@Injectable()
export class PassengerService {
  findAll() {
    return `This action returns all passenger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passenger`;
  }
}
