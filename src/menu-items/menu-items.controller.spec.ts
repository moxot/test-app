import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';

describe('MenuItemsController', () => {
  let controller: MenuItemsController;
  const mockedRepo = {
    findOne: jest.fn(() => Promise.resolve()),
    findAll: jest.fn(() => Promise.resolve()),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuItemsController],
      providers: [
        MenuItemsService,
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

    controller = module.get<MenuItemsController>(MenuItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
