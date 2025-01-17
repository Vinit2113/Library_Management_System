import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { BooksDownloadModule } from './books-download/books-download.module';
import { MembershipModule } from './membership/membership.module';
import { ContributorModule } from './contributor/contributor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { Genre } from './genre/genre.entity';
import { Author } from './author/author.entity';
import { Books } from './books/books.entity';
import { MulterModule } from '@nestjs/platform-express';
import { BuyRentModule } from './buy-rent/buy-rent.module';
import { Membership } from './membership/membership.entity';
import { PremiumUserModule } from './premium-user/premium-user.module';
import { PremiumsUser } from './premium-user/premium-user.entity';
import { BuyRent } from './buy-rent/buy-rent.entity';
import { BooksDownload } from './books-download/books-download.entity';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env'), // Load .env file
      isGlobal: true, // Makes the config globally available
    }),
    MulterModule.register({
      dest: '../uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // Convert DB_PORT to number using '+'
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Genre,
        Author,
        Books,
        Membership,
        PremiumsUser,
        BuyRent,
        BooksDownload,
      ],
      synchronize: true,
    }),
    UserModule,
    BooksModule,
    AuthorModule,
    GenreModule,
    BooksDownloadModule,
    MembershipModule,
    ContributorModule,
    BuyRentModule,
    AuthModule,
    MailModule,
    PremiumUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
