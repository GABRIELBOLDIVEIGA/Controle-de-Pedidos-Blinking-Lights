import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Produto } from './schemas/produto.schemas';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryDTO } from 'src/common/DTOs/query.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel(Produto.name) private productModel: Model<Produto>,
  ) {}

  private buildFilter(keys: Array<keyof Produto>, filter: string) {
    const filtro = keys.map((key) => ({
      [`${key}`]: { $regex: filter, $options: 'i' },
    }));

    return { $or: filtro };
  }

  async create(createProductDto: CreateProductDto): Promise<Produto> {
    const createdproduct = new this.productModel(createProductDto);
    return createdproduct.save();
  }

  async findById(id: string): Promise<Produto> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const user = await this.productModel.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findAll({
    limit = 15,
    page = 0,
    filter,
    promocao_ativa,
  }: QueryDTO & { promocao_ativa: boolean }): Promise<Produto[]> {
    try {
      const filtro = filter
        ? this.buildFilter(['codigo', 'descricao'], filter)
        : {};

      const promocao_ativa_filtro =
        promocao_ativa != undefined ? { promocao_ativa } : {};

      return this.productModel
        .find()
        .where({ ...filtro })
        .where(promocao_ativa_filtro)
        .limit(limit)
        .skip(page * limit)
        .sort({ favorito: -1, descricao: 1 });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateImagemProduto(url: string, id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const updated = await this.productModel.updateOne(
        { _id: id },
        { urlImg: `${url}${id}` },
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException(
          'Erro ao atualizar imagem do produto.',
        );
      }

      return await this.productModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOne(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Produto> {
    try {
      const updated = await this.productModel.updateOne(
        { _id: id },
        updateProductDto,
        {
          new: true,
        },
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException('Atualização de produto falhou.');
      }
      return await this.productModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async softDelete(uuid: string) {
    const isValidId = mongoose.isValidObjectId(uuid);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const deleted = await this.productModel.updateOne(
      { _id: uuid },
      { isDeleted: true },
    );
    if (!deleted.acknowledged) {
      throw new NotImplementedException('Erro ao atualizar dados do usuário.');
    }
    return await this.productModel.findById(uuid);
  }
}
