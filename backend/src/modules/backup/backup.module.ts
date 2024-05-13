import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';
import { ProdutoModule } from '../produto/produto.module';
import { EmailNotificacaoModule } from '../emailsParaNotificacao/emails-notificacao.module';
import { CondicaoDePagamentoModule } from '../condicoesDePagamento/condicaoPagamento.module';
import { ClienteModule } from '../cliente/cliente.module';
import { PedidoModule } from '../pedido/pedido.module';

@Module({
  imports: [
    UsuarioModule,
    UploadModule,
    ProdutoModule,
    CondicaoDePagamentoModule,
    EmailNotificacaoModule,
    ClienteModule,
    PedidoModule,
  ],
  controllers: [BackupController],
  providers: [BackupService, JwtService, UploadService],
})
export class BackupModule {}
