import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemsService } from './menu-items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';

describe('MenuItemsService', () => {
  let service: MenuItemsService;

  const mockedRepo = {
    findOne: jest.fn(() => Promise.resolve()),
    findAll: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<MenuItemsService>(MenuItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
