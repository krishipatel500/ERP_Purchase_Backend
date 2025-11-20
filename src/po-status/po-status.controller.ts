import { Controller, Get, Param } from '@nestjs/common';
import { PoStatusService } from './po-status.service';

@Controller()
export class PoStatusController {
  constructor(private readonly poStatusService: PoStatusService) {}

  // GET /po-status/:po_id
  @Get('po-status/:po_id')
  async getStatus(@Param('po_id') po_id: string) {
    return this.poStatusService.getPoStatus(po_id);
  }
}
