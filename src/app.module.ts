import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PoStatusModule } from './po-status/po-status.module';
import { GrnModule } from './grn/grn.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'),
        dbName: 'erp_db',
      }),
      inject: [ConfigService],
    }),

    PurchaseOrderModule,
    PoStatusModule,
    GrnModule,
  ],
})
export class AppModule {}
