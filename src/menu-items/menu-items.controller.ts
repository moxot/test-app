import { Controller, Get, Param } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemEntity } from '../entities/menu-item.entity';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  findAll(): Promise<MenuItemEntity[]> {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MenuItemEntity | null> {
    return this.menuItemsService.findOne(+id);
  }
}
