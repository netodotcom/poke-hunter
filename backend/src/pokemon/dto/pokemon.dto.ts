import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PokemonDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  sound: string;

  @IsArray()
  @IsString({ each: true })
  types: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatDto)
  stats: StatDto[];

  @IsArray()
  @IsString({ each: true })
  abilities: string[];

  @IsString()
  sprite: string;

  @IsNumber()
  weight: number;
}

class StatDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
