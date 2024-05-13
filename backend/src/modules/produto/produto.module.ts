import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './schemas/produto.schemas';
import { IsNotRegister } from './validator/isNotRegister.pipe';
import { IsValidMongooseId } from '../../pipe/isValidMongooseId.pipe';
import { IsUpdateValidConstraint } from './validator/isUpdateValid.pipe';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    IsNotRegister,
    IsValidMongooseId,
    IsUpdateValidConstraint,
    JwtService,
  ],
  exports: [ProdutoService],
})
export class ProdutoModule {}
