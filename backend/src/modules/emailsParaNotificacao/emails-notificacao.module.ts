import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import {
  EmailNotificacao,
  EmailNotificacaoSchema,
} from './schema/emails-notificacao.schema';
import { EmailNoficicacaoController } from './emails-notificacao.controller';
import { EmailNotificacaoService } from './email-notificacao.service';
import { EnviaEmailModule } from '../enviar-email/enviar-email.module';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailNotificacao.name, schema: EmailNotificacaoSchema },
    ]),
  ],
  controllers: [EmailNoficicacaoController],
  providers: [EmailNotificacaoService, JwtService, JwtStrategy],
  exports: [EmailNotificacaoService],
})
export class EmailNotificacaoModule {}
