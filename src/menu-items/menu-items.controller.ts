import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from '../guards/api-key-guard';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';

@UseGuards(ApiKeyAuthGuard)
@ApiTags('Menu Items Controller')
@Controller('menu-items')
@ApiHeader({
  name: 'x-api-key',
  description: 'api key header',
  required: true,
})
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

  @Get('/options')
  findAllOptions(): Promise<MenuItemOptionEntity[]> {
    return this.menuItemsService.findAllOptions();
  }
}
