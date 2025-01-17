import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Res,
  StreamableFile,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthorService } from 'src/author/author.service';
import { GenreService } from 'src/genre/genre.service';
import { AuthService } from 'src/auth/auth.service';
import { NewBooksDto } from './Dtos/NewBooks.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { listBooksInterceptor } from './interceptors/BookList.interceptor';
import { createReadStream } from 'fs';
import { Response } from 'express';

const storage = diskStorage({
  destination: join(process.cwd(), '/src/documents/upload'),
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    cb(null, name);
  },
});

@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private authService: AuthService,
  ) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() newBooksDto: NewBooksDto,
    @Headers('authorization') token: string,
  ) {
    const decodedToken = await this.authService.validateToken(token);
    if (decodedToken.role === 'user') {
      throw new UnauthorizedException('Unauthorized access to user');
    }
    const { userId } = await this.authService.validateToken(token);

    const author = await this.authorService.findAuthorById(
      newBooksDto.author_id,
    );
    const genreType = await this.genreService.findGenreById(
      newBooksDto.genre_id,
    );
    if (!genreType || !author) {
      return { message: 'not found' };
    }
    newBooksDto.author_id = author.id;
    newBooksDto.genre_id = genreType.id;
    newBooksDto.user_id = userId;

    if (file) {
      console.log(file.filename);
      console.log(file.originalname);
      newBooksDto.title = file.filename;
    }

    // console.log('Final NewBooksDto:', newBooksDto);

    return await this.booksService.UploadBooks(newBooksDto);
  }

  @Get('list')
  @UseInterceptors(listBooksInterceptor)
  async listBooks() {
    return this.booksService.ListBooks();
  }

  @Get('list/:bId')
  async specificBook(
    @Headers('authorization') token: string,
    @Res({ passthrough: true }) res: Response,
    @Param('bId') bId: number,
  ): Promise<StreamableFile> {
    const fileread = await this.booksService.getBookFile(token, bId);
    if (!fileread) {
      throw new NotFoundException('Book not found');
    }
    const prefix = '/src/documents/upload/';
    const filePath = join(process.cwd(), prefix, fileread);
    const file = createReadStream(filePath);
    res.set({
      'Content-Type': 'application/pdf',
      'Coontent-Disposition': `inline; filenam= ${fileread}`,
    });
    // const prefextPath = '/src/documents/upload/';
    // console.log('fileread', fileread);
    // if (prefextPath && !fileread.startsWith(prefextPath)) {
    //   // console.log(`Unexpected File Path: ${fileread}`);
    // }
    return new StreamableFile(file);
  }

  // @Get('docs')
  // async getDocs(
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<StreamableFile> {
  //   const filePath = join(
  //     process.cwd(),
  //     `/src/documents/upload/Can't_Hurt_Me_Master_Your_Mind_and_Defy_the_Odds`,
  //   );
  //   const file = .createReadStream(filePath);
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': `inline; filename= "Can't_Hurt_Me_Master_Your_Mind_and_Defy_the_Odds"`,
  //   });
  //   return new StreamableFile(file);
  // }
}
