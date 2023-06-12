import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

export enum MenuItemSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

@Entity()
export class MenuItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('enum', {
    enum: [MenuItemSize.Small, MenuItemSize.Medium, MenuItemSize.Large],
  })
  size: string;

  @Column({
    type: 'decimal',
    transformer: {
      from: (value) => parseInt(value),
      to: (value) => value,
    },
  })
  price: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.menuItem)
  orderItems: OrderItemEntity[];
}
