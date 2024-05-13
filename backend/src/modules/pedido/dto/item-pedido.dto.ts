import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, Min, Validate } from 'class-validator';
import { IsValidMongooseId } from 'src/pipe/isValidMongooseId.pipe';

export class ItemPedidoDTO {
  @Validate(IsValidMongooseId)
  @ApiProperty({
    type: 'string',
    description: 'ID do produto',
    example: '65d0e40ca715f7be6c46d51e',
    required: true,
  })
  readonly item: string;

  @IsInt()
  @Min(1)
  @ApiProperty({
    type: 'number',
    description: 'Quantidade de itens.',
    example: 3,
    required: true,
  })
  readonly quantidade: number;

  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Utilizar preço promocional?',
    example: false,
    required: true,
  })
  readonly com_preco_promocional: boolean;

  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Adicionar código de barras ao produto?',
    example: true,
    required: true,
  })
  readonly com_codigo_de_barra: boolean;

  @IsArray()
  @ApiProperty({
    type: 'array',
    description: 'Lista de descontos.',
    example: [6, 2, 7],
    required: true,
  })
  readonly descontos: number[];

  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Preço personalizado pelo usuario',
    example: true,
    required: true,
  })
  readonly com_preco_especial: boolean;

  @IsInt()
  @Min(0)
  @ApiProperty({
    type: 'number',
    description: 'Preço personalizado pelo usuario.',
    example: 3,
    required: true,
  })
  readonly preco_especial: number;

  @IsInt()
  @Min(1)
  @ApiProperty({
    type: 'number',
    description: 'Preço do produto',
    example: 3,
    required: true,
  })
  readonly preco: number;
}
