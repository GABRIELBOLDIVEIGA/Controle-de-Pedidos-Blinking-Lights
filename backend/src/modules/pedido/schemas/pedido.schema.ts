import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cliente } from 'src/modules/cliente/schemas/cliente.schema';
import { Usuario } from 'src/modules/usuario/schemas/usuario.schemas';
import { ItemPedido, ItemPedidoSchema } from './itemPedido.schema';
import { Etapa } from '../Enum/Etapa';

@Schema({ timestamps: true })
export class Pedido {
  @Prop({
    type: String,
    unique: [true, 'Código do pedido deve ser único.'],
  })
  codigo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'ID do cliente é obrigatório.'],
    ref: Cliente.name,
    autopopulate: true,
  })
  cliente: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'ID do Usuário é obrigatório.'],
    ref: Usuario.name,
    autopopulate: true,
  })
  usuario: string;

  @Prop({
    type: [ItemPedidoSchema],
    minlength: [1, 'Mínimo de itens deve ser 1.'],
    required: true,
  })
  produtos: ItemPedido[];

  @Prop({
    type: String,
    enum: Etapa,
    default: Etapa.ORCAMENTO,
    required: [true, 'Etapa é obrigatório.'],
  })
  etapa: Etapa;

  @Prop({
    type: String,
    default: '',
  })
  condicao_pagamento: string;

  @Prop({
    type: String,
    default: '',
  })
  transportadora: string;

  @Prop({
    type: String,
    default: '',
  })
  codigo_de_barra: string;

  @Prop({
    type: String,
    default: '',
  })
  observacoes: string;

  @Prop({
    type: Date,
    required: [true, 'Prazo de entrega é obrigatório.'],
    default: '2050-01-01T00:00:00.000+00:00',
  })
  prazo_entrega: Date;

  @Prop({
    type: String,
    default: '',
  })
  telefone: string;

  @Prop({
    type: String,
    default: '',
  })
  entrega_coleta: string;

  @Prop({
    type: String,
    default: '',
  })
  pedido_especial: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  utilizado_como_orcamento: boolean;
}

export type PedidoDocument = HydratedDocument<Pedido>;

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
