import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewBooksDto {
  user_id: number;

  title: string;

  @IsNotEmpty()
  @IsNumber()
  author_id: number;

  @IsNotEmpty()
  @IsNumber()
  genre_id: number;

  @IsNumber()
  @IsNotEmpty()
  publish_year: number;

  @IsNumber()
  @IsNotEmpty()
  total_books: number;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
