import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  async insertGenreTypes(token: string, genre: string): Promise<Genre> {
    console.log('insert genre token', token);
    const visitor = await this.authService.validateToken(token);
    // console.log('visitor', visitor.role);
    if (!visitor || visitor.role === 'user') {
      throw new UnauthorizedException('Unauthorized access to users ');
    }
    const existingGenre = await this.genreRepository.findOne({
      where: { genre: genre },
    });
    if (existingGenre) {
      throw new BadRequestException(`${genre} Already exists`);
    }

    const newGenre = this.genreRepository.create({
      genre: genre,
    });
    return this.genreRepository.save(newGenre);
  }
  // Update and Delete left ----

  async findGenreById(id: number): Promise<Genre> {
    return this.genreRepository.findOne({ where: { id: id, status: 1 } });
  }
}
