import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { MenuItemOptionEntity } from '../entities/menu-item-option.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly burritoRepository: Repository<MenuItemEntity>,
    @InjectRepository(MenuItemOptionEntity)
    private readonly menuItemOptionRepository: Repository<MenuItemOptionEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }

  async findOne(id: number): Promise<OrderEntity | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async createOrder(order: CreateOrderDto): Promise<OrderEntity> {
    const newOrder = new OrderEntity();
    newOrder.totalCost = 0;
    newOrder.items = [];

    for (const orderItemData of order.items) {
      const item = await this.burritoRepository.findOne({
        where: { id: orderItemData.menuItemId },
      });
      if (!item) {
        throw new BadRequestException(
          `Menu item ${orderItemData.menuItemId} not found`,
        );
      }
      const orderItem = new OrderItemEntity();
      orderItem.menuItem = item;
      orderItem.quantity = 1;
      let optionsPrice = 0;
      if (
        Array.isArray(orderItemData.menuItemOptions) &&
        orderItemData.menuItemOptions.length > 0
      ) {
        const options = await this.menuItemOptionRepository.findBy({
          id: In(orderItemData.menuItemOptions.map((o) => o.menuItemOptionId)),
        });
        orderItem.options = options;
        optionsPrice = options.reduce((a, e) => {
          return a + e.price;
        }, 0);
      }
      newOrder.totalCost += item.price + optionsPrice;
      newOrder.items.push(orderItem);
    }

    return this.orderRepository.save(newOrder);
  }
}
