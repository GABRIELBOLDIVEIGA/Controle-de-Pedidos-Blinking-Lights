import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Produto } from 'src/modules/produto/schemas/produto.schemas';

@Schema({ _id: false })
export class ItemPedido {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'ID do produto é obrigatório.'],
    ref: Produto.name,
    autopopulate: true,
  })
  item: string;

  @Prop({
    type: Number,
    required: [true, 'Preço é obrigatório.'],
    min: [0, 'Preço mínimo deve ser 0.'],
  })
  preco: number;

  @Prop({
    type: Number,
    required: [true, 'Quantidade é obrigatório.'],
    min: [1, 'Mínimo de itens deve ser 1.'],
  })
  quantidade: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  com_preco_promocional: boolean;

  @Prop({
    type: Number,
    required: [true, 'Preço Prmocional é obrigatório.'],
    min: [0, 'Preço mínimo deve ser 0.'],
  })
  preco_promocional: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  com_preco_especial: boolean;

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Preço mínimo deve ser 0.'],
  })
  preco_especial: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  com_codigo_de_barra: boolean;

  @Prop({
    type: [Number],
    default: [0, 0, 0],
  })
  descontos: number[];
}
export type ItemPedidoDocument = HydratedDocument<ItemPedido>;

export const ItemPedidoSchema = SchemaFactory.createForClass(ItemPedido);
