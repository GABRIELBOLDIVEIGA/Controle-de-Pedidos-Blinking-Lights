import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'src/pipe/match.pipe';
import { EnderecoDTO } from 'src/common/DTOs/endereco.dto';
import { Permissao } from 'src/common/enums/Permicao';

export class CreateUsuarioDTO {
  @IsNotEmpty()
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
    description: 'Url do avatar do usuario.',
    example: 'www.meu_avatar.com',
  })
  readonly avatar: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'Email do usuario.',
    example: 'usuario@email.com',
    required: true,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Telefone do usuario.',
    example: '(00) 00000-0000',
  })
  readonly telefone: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Demais observaçòes.',
    example: '',
  })
  readonly observacoes: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  @ApiProperty({
    type: 'string',
    description: 'Senha do usuario.',
    example: '**********',
  })
  readonly senha: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    description: 'Usuario ativo ?',
    example: true,
  })
  readonly ativo: boolean;

  @IsEnum(Permissao)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Nível de acesso permitido ao usuário.',
    example: 'DEV | ADM | USER',
  })
  readonly permissao: Permissao;

  @IsNotEmptyObject()
  @IsObject()
  @ApiProperty({
    type: 'object',
    description: 'Enderço do usuario.',
    example: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      numero: '123',
    },
  })
  readonly endereco: EnderecoDTO;
}
