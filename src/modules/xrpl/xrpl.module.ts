import { Module } from '@nestjs/common';
import { XRPLHelper } from './helpers/xrpl.helper';
import { XRPLWalletsService } from './services/xrpl-wallets.service';

@Module({
  providers: [XRPLWalletsService, XRPLHelper],
  exports: [XRPLWalletsService],
})
export class XRPLModule {}
