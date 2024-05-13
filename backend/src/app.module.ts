import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { CondicaoDePagamentoModule } from './modules/condicoesDePagamento/condicaoPagamento.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { EmailNotificacaoModule } from './modules/emailsParaNotificacao/emails-notificacao.module';
import { EnviaEmailModule } from './modules/enviar-email/enviar-email.module';
import { UploadModule } from './modules/upload/upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BackupModule } from './modules/backup/backup.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DATA_BASE_MONGODB),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000,
      },
    ]),
    EnviaEmailModule,
    EmailNotificacaoModule,
    AuthModule,
    ProdutoModule,
    UsuarioModule,
    ClienteModule,
    CondicaoDePagamentoModule,
    PedidoModule,
    UploadModule,
    BackupModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
