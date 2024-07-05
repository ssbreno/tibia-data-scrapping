import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CharacterType } from '../enums/character-type.enum';
import { CharacterListMapper } from '../mappers/character-list.mapper';

export class CharacterListDTO {
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
  @Transform(({ value }) => CharacterListMapper.mapCharacterType(value))
  type: CharacterType;
}
