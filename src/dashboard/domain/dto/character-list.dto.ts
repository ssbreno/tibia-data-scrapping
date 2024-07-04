import { IsEnum, IsInt, IsString } from 'class-validator';

export enum CharacterType {
  MAKER = 'MAKER',
  BOMBA = 'BOMBA',
  MAIN = 'MAIN',
}

export class CharacterListDTO {
  @IsString()
  name: string;

  @IsString()
  vocation: string;

  @IsInt()
  level: number;

  @IsString()
  status: string;

  @IsEnum(CharacterType)
  type: CharacterType;
}
