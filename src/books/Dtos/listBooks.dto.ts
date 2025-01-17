import { Expose } from 'class-transformer';

export class listBookDtos {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  publish_year: number;

  @Expose()
  genre_id: number;

  @Expose()
  author_id: number;
}
