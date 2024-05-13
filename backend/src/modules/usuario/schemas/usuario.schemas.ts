import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EnderecoDTO } from 'src/common/DTOs/endereco.dto';
import { Permissao } from 'src/common/enums/Permicao';

@Schema({ timestamps: true })
export class Usuario {
  _id: string;

  @Prop({
    type: String,
    required: [true, 'Nome é obrigatório.'],
    lowercase: true,
  })
  nome: string;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({
    type: String,
    required: [true, 'Documento é obrigatório.'],
    unique: [true, 'Documento já cadastro no sistemas.'],
  })
  documento: string;

  @Prop({
    type: String,
    default: '',
  })
  razao_social: string;

  @Prop({
    type: String,
    required: [true, 'Email é obrigatório.'],
    unique: [true, 'Email já cadastro no sistemas.'],
  })
  email: string;

  @Prop({ type: String, default: '' })
  telefone: string;

  @Prop({ type: String, default: '' })
  observacoes: string;

  @Prop()
  senha: string;

  @Prop({ type: Boolean, default: true })
  ativo: boolean;

  // @Prop({ required: true, enum: ['ADM', 'USER', 'DEV'] })
  @Prop({
    type: String,
    enum: Permissao,
    default: Permissao.USER,
    required: [true, 'Pemição é obrigatório.'],
  })
  permissao: Permissao;

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

export type UsuarioDocument = HydratedDocument<Usuario>;

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
