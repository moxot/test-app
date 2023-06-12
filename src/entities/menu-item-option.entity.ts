import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity()
export class MenuItemOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => OrderItemEntity, (orderItem) => orderItem.options)
  orderItems: OrderItemEntity[];

  @Column({
    type: 'decimal',
    transformer: {
      from: (value) => parseInt(value),
      to: (value) => value,
    },
  })
  price: number;
}
