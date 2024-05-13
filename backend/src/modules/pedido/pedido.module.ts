import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './schemas/pedido.schema';
import { UsuarioModule } from '../usuario/usuario.module';
import { ClienteModule } from './../cliente/cliente.module';
import { ProdutoModule } from './../produto/produto.module';

import { IsValidMongooseId } from 'src/pipe/isValidMongooseId.pipe';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';
import { EnviaEmailModule } from '../enviar-email/enviar-email.module';
import { EmailNotificacaoModule } from '../emailsParaNotificacao/emails-notificacao.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
    UsuarioModule,
    ClienteModule,
    ProdutoModule,
    EnviaEmailModule,
    EmailNotificacaoModule,
  ],
  controllers: [PedidoController],
  providers: [
    PedidoService,
    IsValidMongooseId,
    JwtService,
    JwtStrategy,
    EnviaEmailService,
  ],
  exports: [PedidoService],
})
export class PedidoModule {}
