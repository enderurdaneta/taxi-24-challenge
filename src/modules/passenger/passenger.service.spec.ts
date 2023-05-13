import { Test, TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';
import { Passenger } from './entities/passenger.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PassengerService', () => {
  let service: PassengerService;
  let repository: Repository<Passenger>;

  //Mock data
  const passengerEntity: Passenger = {
    id: expect.any(Number),
    uid: expect.any(String),
    documentNumber: expect.any(Number),
    documentTypeId: expect.any(Number),
    firtName: expect.any(String),
    lastName: expect.any(String),
    email: expect.any(String),
    phone: expect.any(String),
    createdAt: expect.any(Date),
    deletedAt: null,
    updatedAt: expect.any(Date),
  };

  //Mock repository
  const mockPassengerRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengerService,
        {
          provide: getRepositoryToken(Passenger),
          useValue: mockPassengerRepository,
        },
      ],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
    repository = module.get<Repository<Passenger>>(
      getRepositoryToken(Passenger),
    );
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should findOne', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(passengerEntity);
      expect(
        await service.findOne('90d80c52-e26f-4478-ad14-cb364910ffef'),
      ).toEqual(passengerEntity);
    });

    it('should throw NotFoundException when no reserve found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(
        service.findOne('90d80c52-e26f-4478-ad14-cb364910ffef'),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should findAll', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([passengerEntity]);
      expect(await service.findAll({ limit: 50, offset: 0 })).toEqual([
        passengerEntity,
      ]);
    });

    it('should throw NotFoundException when no reserves found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      await expect(
        service.findAll({ limit: 50, offset: 0 }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
