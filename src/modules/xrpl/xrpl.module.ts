import { Module } from '@nestjs/common';
import { XRPLHelper } from './helpers/xrpl.helper';
import { XRPLService } from './xrpl.service';

@Module({
  providers: [XRPLService, XRPLHelper],
  exports: [XRPLService],
})
export class XRPLModule {}
