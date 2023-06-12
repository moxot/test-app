import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { Repository } from 'typeorm';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private menuItemRepository: Repository<MenuItemEntity>,
    @InjectRepository(MenuItemOptionEntity)
    private menuItemOptionRepository: Repository<MenuItemOptionEntity>,
  ) {}

  async findAll(): Promise<MenuItemEntity[]> {
    return this.menuItemRepository.find();
  }

  async findOne(id: number): Promise<MenuItemEntity | null> {
    return this.menuItemRepository.findOne({ where: { id } });
  }

  async findAllOptions(): Promise<MenuItemOptionEntity[]> {
    return this.menuItemOptionRepository.find();
  }
}
