import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    OrdersModule,
    OrderItemsModule,
    MenuItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
