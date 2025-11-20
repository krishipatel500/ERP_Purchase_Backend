import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseMaster, PurchaseMasterSchema } from './schemas/purchase-master.schema';
import { PurchaseDetail, PurchaseDetailSchema } from './schemas/purchase-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseMaster.name, schema: PurchaseMasterSchema, collection: 'purchase_master_order' },
      { name: PurchaseDetail.name, schema: PurchaseDetailSchema, collection: 'purchase_details_order' },
    ]),
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
