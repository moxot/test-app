import { ArrayMinSize, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class MenuItemOption {
  @IsNumber()
  @ApiProperty()
  menuItemOptionId: number;
}

class OrderItem {
  @IsNumber()
  @ApiProperty()
  menuItemId: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => MenuItemOption, isArray: true })
  @Type(() => MenuItemOption)
  menuItemOptions?: MenuItemOption[];
}

export class CreateOrderDto {
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => OrderItem, isArray: true })
  @Type(() => OrderItem)
  items: OrderItem[];
}
