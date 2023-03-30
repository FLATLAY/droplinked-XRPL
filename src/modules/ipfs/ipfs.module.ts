import { Module } from '@nestjs/common';
import { IPFSService } from './ipfs.service';

@Module({
  providers: [IPFSService],
})
export class IPFSModule {}
