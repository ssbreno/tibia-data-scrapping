import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CharacterType } from '../enums/character-type.enum';
import { CharacterMapper } from '../mappers/character.mapper';

export class CharacterDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  vocation: string;

  @IsNumber()
  level: number;

  @IsEnum(CharacterType)
  @IsOptional()
  @Transform(({ value }) => CharacterMapper.mapCharacterType(value))
  type: CharacterType;
}
