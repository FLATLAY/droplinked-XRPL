import { Test, TestingModule } from '@nestjs/testing';
import { IPFSService } from './ipfs.service';

describe('IPFSService', () => {
  let service: IPFSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IPFSService],
    }).compile();

    service = module.get<IPFSService>(IPFSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
