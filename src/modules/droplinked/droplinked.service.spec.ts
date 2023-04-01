import { Test, TestingModule } from '@nestjs/testing';
import { DroplinkedService } from './droplinked.service';

describe('DroplinkedService', () => {
  let service: DroplinkedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DroplinkedService],
    }).compile();

    service = module.get<DroplinkedService>(DroplinkedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
