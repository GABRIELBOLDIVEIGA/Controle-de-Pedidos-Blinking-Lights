import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Produto {
  @Prop({
    type: String,
    required: [true, 'Codigo do produto é obrigatorio.'],
    unique: [true, 'Codigo do produto deve ser unico.'],
  })
  codigo: string;

  @Prop({
    type: String,
    default: '',
  })
  descricao: string;

  @Prop({
    type: Number,
    required: [true, 'Preço do produto é obrigatorio'],
    min: [0, 'Valor minimo deve ser 0.'],
  })
  preco: number;

  @Prop({
    type: String,
    default: '',
  })
  urlImg: string;

  @Prop({ type: Boolean, default: false })
  favorito: boolean;

  @Prop({ type: Boolean, default: true })
  ativo: boolean;

  @Prop({ type: Number, default: 0 })
  preco_promocional: number;

  @Prop({ type: Boolean, default: false })
  promocao_ativa: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type ProdutoDocument = HydratedDocument<Produto>;

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
