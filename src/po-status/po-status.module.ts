import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseDetail, PurchaseDetailSchema } from '../purchase-order/schemas/purchase-detail.schema';
import { PoStatusService } from './po-status.service';
import { PoStatusController } from './po-status.controller';
import { GrnModule } from '../grn/grn.module'; // ⬅ IMPORT THIS

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseDetail.name, schema: PurchaseDetailSchema },
    ]),
    GrnModule, // ⬅ REQUIRED
  ],
  providers: [PoStatusService],
  controllers: [PoStatusController],
})
export class PoStatusModule {}
