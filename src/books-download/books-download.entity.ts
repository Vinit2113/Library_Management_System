import { Books } from 'src/books/books.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BooksDownload {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Books)
  @JoinColumn({ name: 'books_id' })
  books: Books;

  @Column()
  book_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  downloadedDate: Date;
}
