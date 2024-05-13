import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { UploadService } from '../upload/upload.service';
import { ProdutoService } from '../produto/produto.service';
import { EmailNotificacaoService } from '../emailsParaNotificacao/email-notificacao.service';
import { CondicaoDePagamentoService } from '../condicoesDePagamento/condicaoPagamento.service';
import { ClienteService } from '../cliente/cliente.service';
import { PedidoService } from '../pedido/pedido.service';

@Injectable()
export class BackupService {
  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private uploadService: UploadService,
    private produtoService: ProdutoService,
    private emailNotificacaoService: EmailNotificacaoService,
    private clienteService: ClienteService,
    private condicaoDePagamentoService: CondicaoDePagamentoService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async backupClientes() {
    try {
      const users = await this.clienteService.getAll({
        limit: 50000,
        page: 0,
        filter: undefined,
      });
      const str = JSON.stringify(users);

      await this.uploadService.uploadBackupClientes(str);

      return 'Backup Cliente realizado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async backupCondicoesPagamento() {
    try {
      const condicoes_pagamento =
        await this.condicaoDePagamentoService.getAll();
      const str = JSON.stringify(condicoes_pagamento);

      await this.uploadService.uploadBackupCondicoesPagamento(str);

      return 'Backup Condições Pagamento realizado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async backupEmailNotificacao() {
    try {
      const emails = await this.emailNotificacaoService.getAll();
      const str = JSON.stringify(emails);

      await this.uploadService.uploadBackupEmailNotificacao(str);

      return 'Backup Emails Notificação realizado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async backupPedidos() {
    try {
      const pedidos = await this.pedidoService.getAllPedidos({
        limit: 50000,
        page: 0,
        filter: undefined,
      });
      const str = JSON.stringify(pedidos);

      await this.uploadService.uploadBackupPedidos(str);

      return 'Backup Pedidos realizado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async backupProdutos() {
    try {
      const produtos = await this.produtoService.findAll({
        limit: 50000,
        page: 0,
        filter: undefined,
        promocao_ativa: undefined,
      });
      const str = JSON.stringify(produtos);

      await this.uploadService.uploadBackupProdutos(str);

      return 'Backup Produtos realizado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async backupUsuarios() {
    try {
      const usuarios = await this.usuarioService.findAll({
        limit: 50000,
        page: 0,
        filter: undefined,
      });
      const str = JSON.stringify(usuarios);

      await this.uploadService.uploadBackupUsuarios(str);

      return 'Backup Usuários realizado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
