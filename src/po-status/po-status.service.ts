import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PurchaseDetail, PurchaseDetailDocument } from '../purchase-order/schemas/purchase-detail.schema';
import { Model } from 'mongoose';

@Injectable()
export class PoStatusService {
  constructor(@InjectModel(PurchaseDetail.name) private detailModel: Model<PurchaseDetailDocument>) {}

  // Return item array with computed pending qty = po_qty - (po_rec_qty + po_adj_qty)
  async getPoStatus(po_id: string) {
    const rows = await this.detailModel.find({ po_id }).sort({ po_sr: 1 }).lean();
    if (!rows || rows.length === 0) {
      throw new NotFoundException('PO details not found');
    }


    

    const items = rows.map((r) => {
      const po_qty = Number(r.po_qty);
      const po_rec_qty = Number(r.po_rec_qty || 0);
      const po_adj_qty = Number(r.po_adj_qty || 0);
      const po_pending_qty = Number((po_qty - (po_rec_qty + po_adj_qty)).toFixed(2));
      return {
        po_id: r.po_id,
        po_sr: r.po_sr,
        pro_id: r.pro_id,
        po_qty,
        po_rec_qty,
        po_adj_qty,
        po_pending_qty,
      };
    });

    return items;
  }
}
