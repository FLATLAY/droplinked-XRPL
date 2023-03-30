import { Test, TestingModule } from '@nestjs/testing';
import { XRPLService } from './xrpl.service';

describe('XRPLService', () => {
  let service: XRPLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XRPLService],
    }).compile();

    service = module.get<XRPLService>(XRPLService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
