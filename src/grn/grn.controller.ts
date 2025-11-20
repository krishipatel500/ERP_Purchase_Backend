import { Controller, Post, Body } from '@nestjs/common';
import { GrnService } from './grn.service';
import { CreateGrnDto } from './dto/create-grn.dto';

@Controller()
export class GrnController {
  constructor(private readonly grnService: GrnService) {}

  // POST /grn
  @Post('grn')
  async createGRN(@Body() dto: CreateGrnDto) {
    return this.grnService.create(dto);
  }
}
