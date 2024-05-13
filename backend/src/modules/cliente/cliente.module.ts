import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cliente, ClienteSchema } from './schemas/cliente.schema';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { IsValidMongooseId } from 'src/pipe/isValidMongooseId.pipe';
import { JwtService } from '@nestjs/jwt';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';
import { EmailNotificacaoModule } from '../emailsParaNotificacao/emails-notificacao.module';
// import { EnviaEmailModule } from '../enviar-email/enviar-email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }]),
    UsuarioModule,
    // EnviaEmailModule,
    EmailNotificacaoModule,
  ],
  controllers: [ClienteController],
  providers: [ClienteService, IsValidMongooseId, JwtService, EnviaEmailService],
  exports: [ClienteService],
})
export class ClienteModule {}
