import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class CondicaoDePagamento {
  @Prop({
    type: String,
    required: [true, 'Condição de pagamento é obrigatorio.'],
  })
  descricao: string;

  @Prop({
    type: String,
    required: [true, 'Tipo é obrigatorio.'],
  })
  tipo: string;
}

export type CondicaoDePagamentoDocument = HydratedDocument<CondicaoDePagamento>;

export const CondicaoDePagamentoSchema =
  SchemaFactory.createForClass(CondicaoDePagamento);
