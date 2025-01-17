import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { SaveAuthorDtos } from './Dtos/author.dtos';
import { Author } from './author.entity';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post('/new')
  async addNewAuthor(
    @Headers('authorization') token: string,
    @Body() saveAuthorDtos: SaveAuthorDtos,
  ): Promise<Author> {
    return this.authorService.insertAuthors(token, saveAuthorDtos);
  }
}
