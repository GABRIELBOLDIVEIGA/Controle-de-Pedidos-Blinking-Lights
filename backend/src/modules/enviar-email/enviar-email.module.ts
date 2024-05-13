import { Module, forwardRef } from '@nestjs/common';
import { EnviaEmailService } from './enviar-email.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { ProdutoModule } from '../produto/produto.module';
import { JwtService } from '@nestjs/jwt';
import { EmailNotificacaoModule } from '../emailsParaNotificacao/emails-notificacao.module';
// import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    // ClienteModule,
    EmailNotificacaoModule,
  ],
  controllers: [],
  providers: [EnviaEmailService, JwtService],
  exports: [EnviaEmailService],
})
export class EnviaEmailModule {}
