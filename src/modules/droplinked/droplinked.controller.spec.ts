import { Test, TestingModule } from '@nestjs/testing';
import { DroplinkedController } from './droplinked.controller';

describe('DroplinkedController', () => {
  let controller: DroplinkedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DroplinkedController],
    }).compile();

    controller = module.get<DroplinkedController>(DroplinkedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
