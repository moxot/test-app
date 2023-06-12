import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MenuItemEntity } from './menu-item.entity';
import { OrderEntity } from './order.entity';
import { MenuItemOptionEntity } from './menu-item-option.entity';

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MenuItemEntity, (menuItem) => menuItem.orderItems, {
    eager: true,
  })
  menuItem: MenuItemEntity;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToMany(() => MenuItemOptionEntity, { eager: true })
  @JoinTable()
  options: MenuItemOptionEntity[];
}
