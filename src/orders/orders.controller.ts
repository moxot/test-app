import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { OrderEntity } from '../entities/order.entity';
import { ApiKeyAuthGuard } from '../guards/api-key-guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('orders')
@ApiTags('Orders Controller')
@ApiHeader({
  name: 'x-api-key',
  description: 'api key header',
  required: true,
})
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post(`/`)
  async createOrder(@Body() createOrder: CreateOrderDto): Promise<OrderEntity> {
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
