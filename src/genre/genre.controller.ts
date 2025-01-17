import { Body, Controller, Headers, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Post('/new')
  async addNewGenre(
    @Headers('Authorization') token: string,
    @Body('genre') genre: string,
  ): Promise<Genre> {
    console.log('token', token);

    return this.genreService.insertGenreTypes(token, genre);
  }
}
