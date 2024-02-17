import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
