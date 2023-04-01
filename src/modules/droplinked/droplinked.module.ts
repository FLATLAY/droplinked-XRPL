import { Module } from '@nestjs/common';
import { DroplinkedController } from './droplinked.controller';
import { DroplinkedService } from './droplinked.service';

@Module({
  controllers: [DroplinkedController],
  providers: [DroplinkedService]
})
export class DroplinkedModule {}
