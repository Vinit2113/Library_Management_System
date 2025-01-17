import { Module } from '@nestjs/common';
import { BooksDownloadService } from './books-download.service';
import { BooksDownloadController } from './books-download.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksDownload } from './books-download.entity';
import { UserModule } from 'src/user/user.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([BooksDownload]), UserModule, BooksModule],
  providers: [BooksDownloadService],
  controllers: [BooksDownloadController],
  exports: [BooksDownloadService],
})
export class BooksDownloadModule {}
