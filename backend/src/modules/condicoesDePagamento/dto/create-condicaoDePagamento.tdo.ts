import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCondicaoDePagamentoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Condições de pagamento.',
    example: '10/15/20 dias',
  })
  readonly descricao: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'A vista ou a prazo.',
    example: 'A Prazo',
  })
  readonly tipo: string;
}
