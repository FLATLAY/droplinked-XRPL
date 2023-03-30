import { Test, TestingModule } from '@nestjs/testing';
import { XRPLWalletsService } from './xrpl-wallets.service';

describe('XRPLWalletsService', () => {
  let service: XRPLWalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XRPLWalletsService],
    }).compile();

    service = module.get<XRPLWalletsService>(XRPLWalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
