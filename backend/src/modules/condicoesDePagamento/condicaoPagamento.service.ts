import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CondicaoDePagamento } from './schema/condicaoDePagamento.schema';
import { CreateCondicaoDePagamentoDto } from './dto/create-condicaoDePagamento.tdo';

@Injectable()
export class CondicaoDePagamentoService {
  constructor(
    @InjectModel(CondicaoDePagamento.name)
    private condicaoDePagamentoModel: Model<CondicaoDePagamento>,
  ) {}

  async create(
    createCondicaoDePagamentoDto: CreateCondicaoDePagamentoDto,
  ): Promise<CondicaoDePagamento> {
    const createdCondicaoDePagamento = new this.condicaoDePagamentoModel(
      createCondicaoDePagamentoDto,
    );
    return createdCondicaoDePagamento.save();
  }

  async getAll() {
    return await this.condicaoDePagamentoModel.find().sort({ descricao: -1 });
  }

  async updateOne(id: string, condicao: CreateCondicaoDePagamentoDto) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const updated = await this.condicaoDePagamentoModel.updateOne(
      { _id: id },
      condicao,
    );
    if (!updated.acknowledged) {
      throw new NotImplementedException('Erro ao atualizar dados do usuário.');
    }

    return await this.condicaoDePagamentoModel.findById(id);
  }

  async delete(id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      return await this.condicaoDePagamentoModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
