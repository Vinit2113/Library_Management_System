import { Test, TestingModule } from '@nestjs/testing';
import { BooksDownloadController } from './books-download.controller';

describe('BooksDownloadController', () => {
  let controller: BooksDownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksDownloadController],
    }).compile();

    controller = module.get<BooksDownloadController>(BooksDownloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
