import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';

describe('OrderController', () => {
  let controller: OrdersController;
  const mockedRepo = {
    findOne: jest.fn(() => Promise.resolve()),
    findAll: jest.fn(() => Promise.resolve()),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
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

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
