import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class EmailNotificacao {
  @Prop({
    type: String,
    required: [true, 'Nome do Usuário é obrigatorio.'],
  })
  nome: string;

  @Prop({
    type: String,
    required: [true, 'Email é obrigatorio.'],
    unique: true,
  })
  email: string;
}

export type EmailNotificacaoDocument = HydratedDocument<EmailNotificacao>;

export const EmailNotificacaoSchema =
  SchemaFactory.createForClass(EmailNotificacao);
