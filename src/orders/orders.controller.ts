import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { OrderEntity } from '../entities/order.entity';

@Controller('orders')
@ApiTags('Orders Controller')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post(`/`)
  async createLedgerTransaction(
    @Body() createOrder: CreateOrderDto,
  ): Promise<OrderEntity> {
    return await this.ordersService.createOrder(createOrder);
  }

  @Get(`/`)
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrderEntity | null> {
    return this.ordersService.findOne(+id);
  }
}
