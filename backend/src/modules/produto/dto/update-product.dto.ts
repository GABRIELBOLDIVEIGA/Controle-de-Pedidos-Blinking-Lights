import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Codigo do produto.',
    example: '103BC1657',
  })
  readonly codigo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Descrição do produto.',
    example: 'Base roscada.',
  })
  readonly descricao: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Preço do produto.',
    example: 12.43,
  })
  readonly preco: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Url da imagem do produto.',
    example: 'www.img.com.br',
  })
  readonly urlImg: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Produto marcado como favorito pelo ADM.',
    example: false,
  })
  readonly favorito: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Produto disponivel para venda.',
    example: true,
  })
  readonly ativo: boolean;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Preço promocional do produto.',
    example: 10.32,
  })
  readonly preco_promocional: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Preço promocional ativado.',
    example: false,
  })
  readonly promocao_ativa: boolean;
}
