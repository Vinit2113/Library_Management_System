import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { SaveAuthorDtos } from './Dtos/author.dtos';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    private authService: AuthService,
  ) {}

  async insertAuthors(
    token: string,
    { email, name }: SaveAuthorDtos,
  ): Promise<Author> {
    const visitor = await this.authService.validateToken(token);
    if (!visitor || visitor.role == 'user') {
      throw new UnauthorizedException('Unauthorized access to users');
    }
    const existingUser = await this.authorRepository.findOne({
      where: { email: email, status: 1 },
    });
    if (existingUser) {
      throw new ConflictException('Author already exists');
    }

    const newAuthor = this.authorRepository.create({
      email: email,
      name: name,
    });
    return this.authorRepository.save(newAuthor);
  }

  async findAuthorById(id: number): Promise<Author> {
    return this.authorRepository.findOne({ where: { id: id, status: 1 } });
  }
}
