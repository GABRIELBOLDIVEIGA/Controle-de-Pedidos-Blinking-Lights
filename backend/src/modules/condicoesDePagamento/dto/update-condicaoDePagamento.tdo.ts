import { PartialType } from '@nestjs/swagger';
import { CreateCondicaoDePagamentoDto } from './create-condicaoDePagamento.tdo';

export class UpdateCondicaoDePagamentoDto extends PartialType(
  CreateCondicaoDePagamentoDto,
) {}
