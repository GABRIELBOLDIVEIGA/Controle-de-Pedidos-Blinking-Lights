import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { JwtService } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { ProdutoModule } from '../produto/produto.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 2,
    //   },
    // ]),
    UsuarioModule,
    ProdutoModule,
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    JwtService,
    // { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class UploadModule {}
