import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnderecoDTO } from 'src/common/DTOs/endereco.dto';
import { Usuario } from 'src/modules/usuario/schemas/usuario.schemas';

@Schema({ timestamps: true })
export class Cliente {
  _id: string;

  @Prop({
    type: String,
    required: [true, 'Documento do Cliente é obrigatorio.'],
  })
  nome: string;

  @Prop({
    type: String,
    required: [true, 'Documento do Cliente é obrigatorio.'],
    unique: [true, 'Documento já cadastrado em nossa base de dados.'],
  })
  documento: string;

  @Prop({ type: String, default: '' })
  inscricao_estadual: string;

  @Prop({ type: String, default: '' })
  razao_social: string;

  @Prop({ type: String, default: '' })
  telefone: string;

  @Prop({
    type: String,
    required: [true, 'Email do Cliente é obrigatorio.'],
  })
  email: string;

  @Prop({ type: String, default: '' })
  observacoes: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'ID do Usuario é obrigatorio.'],
    ref: Usuario.name,
    autopopulate: true,
  })
  usuario_responsavel: string;

  @Prop(
    raw({
      cep: { type: String, default: '' },
      logradouro: { type: String, default: '' },
      complemento: { type: String, default: '' },
      bairro: { type: String, default: '' },
      localidade: { type: String, default: '' },
      uf: { type: String, default: '' },
      numero: { type: String, default: '' },
    }),
  )
  endereco: EnderecoDTO;

  @Prop({ default: false })
  isDeleted: boolean;
}

export type ClienteDocument = HydratedDocument<Cliente>;

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
