import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewBooksDto } from './Dtos/NewBooks.dto';
import { AuthService } from 'src/auth/auth.service';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepo: Repository<Books>,
    private authService: AuthService,
  ) {}

  async UploadBooks(newBooksDto: NewBooksDto): Promise<Books> {
    const books = this.booksRepo.create(newBooksDto);
    return await this.booksRepo.save(books);
  }

  async ListBooks(): Promise<Books[]> {
    return await this.booksRepo.find({ where: { status: 1 } });
  }

  async getBook(token: string, bId: number): Promise<Books> {
    // console.log('hey', bId);

    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken) {
      throw new Error(`Invalid token`);
    }
    const book = await this.booksRepo.findOne({
      where: { id: bId, status: 1 },
    });
    // console.log(book);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    // console.log(book);
    return book;
  }

  async readUploadedFile(filename: string): Promise<string> {
    // const prefix = '/src/documents/upload/';
    console.log('helo', process.cwd());

    const filePath = join(process.cwd() + '/src/documents/upload/' + filename);
    console.log('filepath', filePath);

    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return data;
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('file not found', filePath);
      } else {
        console.log(error);
      }
    }
  }

  async getBookFile(token: string, bId: number): Promise<string | undefined> {
    const book = await this.getBook(token, bId);
    // console.log(book);
    // console.log('hello', book);

    if (!book || !book.title) {
      throw new NotFoundException('Book not found');
    }
    const filename = book.title;
    // console.log('read FIle name  ', filename);

    if (!filename) {
      throw new NotFoundException('No book found');
    }
    return filename;
    const fileData = await this.readUploadedFile(filename);
    // console.log('here is file data ', fileData);

    return fileData;
  }

  async BookCostAndId(bookd_id: number) {
    return await this.booksRepo.findOne({
      where: { id: bookd_id },
      select: ['cost', 'id'],
    });
  }
}
