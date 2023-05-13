import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DriverService', () => {
  let service: DriverService;
  let repository: Repository<Driver>;

  //Mock data
  const driverEntity: Driver = {
    id: expect.any(Number),
    uid: expect.any(String),
    documentNumber: expect.any(Number),
    documentTypeId: expect.any(Number),
    firtName: expect.any(String),
    lastName: expect.any(String),
    email: expect.any(String),
    phone: expect.any(String),
    brand: expect.any(String),
    capacity: expect.any(Number),
    color: expect.any(String),
    licensePlate: expect.any(String),
    createdAt: expect.any(Date),
    deletedAt: null,
    updatedAt: expect.any(Date),
  };

  //Mock repository
  const mockDriverRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    manager: {
      query: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: mockDriverRepository,
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    repository = module.get<Repository<Driver>>(getRepositoryToken(Driver));
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should findOne', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(driverEntity);
      expect(
        await service.findOne('90d80c52-e26f-4478-ad14-cb364910ffef'),
      ).toEqual(driverEntity);
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
      jest.spyOn(repository, 'find').mockResolvedValue([driverEntity]);
      expect(
        await service.findAll({ limit: 50, offset: 0, available: 'false' }),
      ).toEqual([driverEntity]);
    });

    it('should throw NotFoundException when no reserves found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      await expect(
        service.findAll({ limit: 50, offset: 0, available: 'false' }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
