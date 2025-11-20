import { Module } from '@nestjs/common';
import { GrnService } from './grn.service';
import { GrnController } from './grn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GrnMaster, GrnMasterSchema } from './schemas/grn-master.schema';
import { GrnDetail, GrnDetailSchema } from './schemas/grn-detail.schema';
import { PurchaseOrderModule } from '../purchase-order/purchase-order.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GrnMaster.name, schema: GrnMasterSchema, collection: 'grn_master' },
      { name: GrnDetail.name, schema: GrnDetailSchema, collection: 'grn_details' },
    ]),
    PurchaseOrderModule, // to use PurchaseOrderService for updating rec_qty
  ],
  controllers: [GrnController],
  providers: [GrnService],
})
export class GrnModule {}
