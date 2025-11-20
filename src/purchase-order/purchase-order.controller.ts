import { Controller, Post, Body } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { RevisionPurchaseOrderDto } from './dto/revision-purchase-order.dto';

@Controller()
export class PurchaseOrderController {
  constructor(private readonly poService: PurchaseOrderService) {}

  // POST /purchase-order
  @Post('purchase-order')
  async createPO(@Body() dto: CreatePurchaseOrderDto) {
    return this.poService.create(dto);
  }

  // POST /purchase-order/revision
  @Post('purchase-order/revision')
  async revisePO(@Body() dto: RevisionPurchaseOrderDto) {
    return this.poService.revise(dto);
  }
}
