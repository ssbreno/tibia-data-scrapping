import { CharacterType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CharacterListDTO {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  vocation: string;

  @IsInt()
  level: number;

  @IsEnum(CharacterType)
  type: CharacterType;
}
