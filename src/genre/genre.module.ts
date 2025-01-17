import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Genre]), AuthModule],
  providers: [GenreService, JwtService],
  controllers: [GenreController],
  exports: [GenreService],
})
export class GenreModule {}
