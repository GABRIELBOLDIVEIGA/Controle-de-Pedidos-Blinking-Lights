import { IsString, IsOptional } from 'class-validator';

export class EnderecoDTO {
  @IsString()
  @IsOptional()
  cep: string;

  @IsString()
  @IsOptional()
  logradouro: string;

  @IsString()
  @IsOptional()
  complemento: string;

  @IsString()
  @IsOptional()
  bairro: string;

  @IsString()
  @IsOptional()
  localidade: string;

  @IsString()
  @IsOptional()
  uf: string;

  @IsString()
  @IsOptional()
  numero: string;
}
