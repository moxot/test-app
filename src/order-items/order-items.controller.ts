import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('order-item')
@ApiTags('Orders Items Controller')
export class OrderItemsController {}
