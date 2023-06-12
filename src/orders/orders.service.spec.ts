import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrderService', () => {
  let service: OrdersService;
  const mockedRepo = {
    findOne: jest.fn(() => Promise.resolve()),
    findAll: jest.fn(() => Promise.resolve()),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: mockedRepo,
        },
        {
          provide: getRepositoryToken(OrderItemEntity),
          useValue: mockedRepo,
        },
        {
          provide: getRepositoryToken(MenuItemEntity),
          useValue: mockedRepo,
        },
        {
          provide: getRepositoryToken(MenuItemOptionEntity),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
