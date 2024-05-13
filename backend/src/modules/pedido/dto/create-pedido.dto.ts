import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidMongooseId } from 'src/pipe/isValidMongooseId.pipe';
import { ItemPedidoDTO } from './item-pedido.dto';
import { Etapa } from '../Enum/Etapa';

export class CreatePedidoDTO {
  @Validate(IsValidMongooseId)
  @ApiProperty({
    type: 'string',
    description: 'ID do cliente',
    example: '65d0e40ca715f7be6c46d51e',
    required: true,
  })
  readonly cliente: string;

  @Validate(IsValidMongooseId)
  @ApiProperty({
    type: 'string',
    description: 'ID do Usuário',
    example: '65d0e40ca715f7be6c46d51e',
    required: true,
  })
  readonly usuario: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    type: 'array',
    description: 'Lista de itens do orçamento.',
    example: [
      {
        item: '65d0e40ca715f7be6c46d32a',
        quantidade: 3,
        com_preco_promocional: false,
        com_preco_especial: false,
        preco_especial: 2,
        com_codigo_de_barra: true,
        descontos: [7, 3, 8],
      },
    ],
    required: true,
  })
  readonly produtos: ItemPedidoDTO[];

  @IsEnum(Etapa)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Etapa do orçamento.',
    example: 'ORCAMENTO | ANALISE | FINALIZADO',
    required: true,
  })
  readonly etapa: Etapa;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Condições de pagamento.',
    example: '10/15/20 dias',
    default: '',
  })
  readonly condicao_pagamento: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Transportadora.',
    example: 'Mandou Chegou Logistica',
    default: '',
  })
  readonly transportadora: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Código dos produtos marcados para ter barras.',
    example: '111BA2348, 222BU1650, 222CH2591, 114BA1647, 512CV2401',
    default: '',
  })
  readonly codigo_de_barra: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Demais Observações sobre o orçamento.',
    example: 'Observações sobre o orçamento',
    default: '',
  })
  readonly observacoes: string;

  @IsDateString()
  @ApiProperty({
    type: 'string',
    description: 'Data do prazo de entrega.',
    example: '2050-01-01T00:00:00.000+00:00',
    default: '2050-01-01T00:00:00.000+00:00',
  })
  readonly prazo_entrega: Date;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Telefone adicional para contato.',
    example: '(11) 9 9238-8470',
    default: '(11) 9 9238-8470',
  })
  readonly telefone: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Forma de entrega.',
    example: 'Retirar no local.',
    default: '',
  })
  readonly entrega_coleta: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Pedido especial.',
    example: 'Caso haja algo em específico sobre o orçamento.',
    default: '',
  })
  readonly pedido_especial: string;
}
