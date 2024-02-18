import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateTrainingDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PLayerDto)
  players: PLayerDto[];
}

export class PLayerDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StatsDto)
  stats: StatsDto[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  score?: number;

  @IsOptional()
  @IsDate()
  created_at?: string;
}

export class SpeedDto {
  @IsNotEmpty()
  @IsString()
  distance: string;

  @IsNotEmpty()
  @IsString()
  time: string;
}

export class StatsDto {
  @IsNotEmpty()
  @IsString()
  power: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SpeedDto)
  speed: SpeedDto;

  @IsNotEmpty()
  @IsString()
  passes: string;
}
