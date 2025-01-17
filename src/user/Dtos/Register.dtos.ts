import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  // IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Gender, Role } from '../user.entity';

export class NewUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: number;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender = Gender.male;

  @IsEnum(Role)
  @IsOptional()
  role: Role = Role.user;
}
