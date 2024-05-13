import {
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { Resend } from 'resend';
import { templateEsqueciMinhaSenha } from './template/template-esqueci-senha';
import { templateNovoPedido } from './template/template-novo-pedido';
import mongoose from 'mongoose';
import { UsuarioService } from '../usuario/usuario.service';
import { EmailNotificacaoService } from '../emailsParaNotificacao/email-notificacao.service';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/schemas/cliente.schema';
import { templateClienteAtualizado } from './template/template-cliente-atualizado';

@Injectable()
export class EnviaEmailService {
  constructor(
    private usuarioService: UsuarioService,
    // private clienteService: ClienteService,
    private emailNotificacaoService: EmailNotificacaoService,
  ) {}

  async esqueciMinhaSenha(email: string, senha: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: 'alerta@manutencaodeinformatica.com.br',
        to: `${email}`,
        subject: 'KMB Rodízios',
        html: templateEsqueciMinhaSenha(senha),
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async noficacaoNovoPedido(
    pedido_id: mongoose.Types.ObjectId,
    usuario_id: string,
  ) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      const emails_notificacao = await this.emailNotificacaoService.getAll();
      const emails = emails_notificacao.map((email) => email.email);
      const usuario = await this.usuarioService.findById(usuario_id);
      await resend.emails.send({
        from: 'alerta@manutencaodeinformatica.com.br',
        to: [...emails],
        subject: 'KMB Rodízios',
        html: templateNovoPedido(usuario.nome, pedido_id),
      });
    } catch (error) {
      console.warn('[Error] - ', error);
    }
  }

  async notificaoClienteAtualizado(cliente: Cliente, usuario_nome: string) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emails_notificacao = await this.emailNotificacaoService.getAll();
      const emails = emails_notificacao.map((email) => email.email);
      await resend.emails.send({
        from: 'alerta@manutencaodeinformatica.com.br',
        to: [...emails],
        subject: 'KMB Rodízios',
        html: templateClienteAtualizado(cliente, usuario_nome),
      });
    } catch (error) {
      console.warn('[Error] - ', error);
    }
  }
}
