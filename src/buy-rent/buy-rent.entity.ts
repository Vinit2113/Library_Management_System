import { Books } from 'src/books/books.entity';
import { User } from 'src/user/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BuyRent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Books)
  @JoinColumn({ name: 'books_id' })
  books: Books;

  @Column()
  books_id: number;

  @Column({ type: 'tinyint', default: 0 })
  rent: number;

  @Column({ default: 5 })
  totalDaysRented: number;

  @Column({ type: 'tinyint', default: 0 })
  buy: number;

  @Column({})
  cost: number;

  @Column({ default: 0 })
  penalty: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  takenDate: Date;

  @Column({ type: 'datetime', default: null })
  returnDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated: Date;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @BeforeInsert()
  @BeforeUpdate()
  anyOne() {
    if (this.rent) {
      this.buy = 0;
    } else {
      this.rent = 0;
    }
  }
}
