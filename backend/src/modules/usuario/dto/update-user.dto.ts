import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'src/pipe/match.pipe';
import { EnderecoDTO } from 'src/common/DTOs/endereco.dto';
import { Permissao } from 'src/common/enums/Permicao';

export class UpdateUsuarioDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Nome do usuario.',
    example: 'Gabriel',
    required: true,
  })
  readonly nome: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Documento do usuario.',
    example: '000.000.000-00',
    required: true,
  })
  readonly documento: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Razão Social do usuário.',
    example: 'Boldi DEV .cia',
    required: false,
  })
  readonly razao_social: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'Email do usuario.',
    example: 'usuario@email.com',
    required: true,
  })
  readonly email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Telefone do usuario.',
    example: '(00) 00000-0000',
  })
  readonly telefone: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Demais observaçòes.',
    example: '',
  })
  readonly observacoes: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(25)
  @ApiProperty({
    type: 'string',
    description: 'Senha do usuario.',
    example: '**********',
  })
  readonly senha: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(25)
  @Match('senha')
  @ApiProperty({
    type: 'string',
    description: 'Confirmar do usuario.',
    example: '**********',
  })
  readonly confirmarSenha: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    description: 'Usuario ativo ?',
    example: true,
  })
  readonly ativo: boolean;

  @IsEnum(Permissao)
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Usuario ativo ?',
    example: '[DEV, ADM, USER]',
  })
  readonly permissao: Permissao;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    type: 'object',
    description: 'Enderço do usuario.',
    example: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      numero: '123',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    },
  })
  readonly endereco: EnderecoDTO;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Usuário deletado.',
    example: 'false',
  })
  readonly isDeleted: boolean;
}
