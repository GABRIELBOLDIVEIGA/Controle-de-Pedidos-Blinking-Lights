import { Module } from '@nestjs/common';
import {
  CondicaoDePagamento,
  CondicaoDePagamentoSchema,
} from './schema/condicaoDePagamento.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CondicaoDePagamentoController } from './condicaoPagamento.controller';
import { CondicaoDePagamentoService } from './condicaoPagamento.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CondicaoDePagamento.name, schema: CondicaoDePagamentoSchema },
    ]),
  ],
  controllers: [CondicaoDePagamentoController],
  providers: [CondicaoDePagamentoService, JwtService],
  exports: [CondicaoDePagamentoService],
})
export class CondicaoDePagamentoModule {}
