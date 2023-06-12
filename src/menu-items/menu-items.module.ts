import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity, MenuItemOptionEntity])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
})
export class MenuItemsModule {}
