import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Validate,
} from 'class-validator';
import { EnderecoDTO } from 'src/common/DTOs/endereco.dto';
import { IsValidMongooseId } from 'src/pipe/isValidMongooseId.pipe';

export class CreateClienteDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Nome do Cliente.',
    example: 'Cliente Teste',
    required: true,
  })
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'E-mail do Cliente.',
    example: 'clienteTeste@gmail.com',
    required: true,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Documento do Cliente.',
    example: '000.000.000-00',
    required: true,
  })
  readonly documento: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Inscrição Estadual do Cliente.',
    example: '00000000000',
    required: true,
  })
  readonly inscricao_estadual: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Razão Social do Cliente.',
    example: 'Razão Social',
    required: true,
  })
  readonly razao_social: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Demais Observações sobre o Cliente.',
    example: 'Observações sobre o Cliente',
  })
  readonly observacoes: string;

  @IsNotEmptyObject()
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

  @Validate(IsValidMongooseId)
  @ApiProperty({
    type: 'string',
    description: 'ID do Representante',
    example: '65d0e40ca715f7be6c46d51e',
    required: true,
  })
  usuario_responsavel: string;
}
