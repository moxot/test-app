import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private menuItemRepository: Repository<MenuItemEntity>,
  ) {}

  async findAll(): Promise<MenuItemEntity[]> {
    return this.menuItemRepository.find();
  }

  async findOne(id: number): Promise<MenuItemEntity | null> {
    return this.menuItemRepository.findOne({ where: { id } });
  }
}
