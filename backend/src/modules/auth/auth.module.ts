import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtService } from '@nestjs/jwt';
import { EnviaEmailModule } from '../enviar-email/enviar-email.module';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';

import { EmailNotificacaoService } from '../emailsParaNotificacao/email-notificacao.service';
import { EmailNotificacaoModule } from '../emailsParaNotificacao/emails-notificacao.module';

@Module({
  imports: [
    UsuarioModule,
    HttpModule,
    EnviaEmailModule,
    EmailNotificacaoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, EnviaEmailService],
  exports: [AuthService],
})
export class AuthModule {}
