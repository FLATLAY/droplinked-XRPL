import { Module } from '@nestjs/common';
import { XRPLHelper } from './helpers/xrpl.helper';
import { XRPLService } from './xrpl.service';

@Module({
  providers: [XRPLService, XRPLHelper],
})
export class XRPLModule {}
