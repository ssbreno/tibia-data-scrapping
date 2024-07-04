import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RespawnDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  character: string;

  @IsBoolean()
  @IsOptional()
  is_pt: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  pt_members: string[];
}
