import { IsNotEmpty, IsString } from 'class-validator';

export class SaveAuthorDtos {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
