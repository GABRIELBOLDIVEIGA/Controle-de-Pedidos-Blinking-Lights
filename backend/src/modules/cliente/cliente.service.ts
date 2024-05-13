import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cliente } from './schemas/cliente.schema';
import mongoose, { Model } from 'mongoose';
import { CreateClienteDTO } from './dto/create-client.dto';
import { QueryDTO } from 'src/common/DTOs/query.dto';
import { UpdateClienteDTO } from './dto/update-client.dto';
import { JwtDTO } from '../auth/dto/jwt.dto';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<Cliente>,
    private enviaEmailService: EnviaEmailService,
  ) {}

  private buildFilter(keys: Array<keyof Cliente>, filter: string) {
    const filtro = keys.map((key) => ({
      [`${key}`]: { $regex: filter, $options: 'i' },
    }));

    return { $or: filtro };
  }

  async getAll({ limit = 5000, page = 0, filter }: QueryDTO) {
    try {
      const filtro = filter
        ? this.buildFilter(['documento', 'email', 'nome', 'telefone'], filter)
        : {};

      const clientes = await this.clienteModel
        .find()
        .where({ ...filtro })
        .limit(limit)
        .skip(page * limit)
        .sort({ nome: 1 });

      return clientes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllForTable() {
    try {
      const clientes = await this.clienteModel
        .find()
        .sort({ nome: 1 })
        .populate('usuario_responsavel', 'nome');

      return clientes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async clientesByUserId({
    limit = 15,
    page = 0,
    filter,
    ...user
  }: QueryDTO & JwtDTO) {
    try {
      const clientes = await this.clienteModel
        .find()
        .where({ usuario_responsavel: user.user_id, isDeleted: false })
        .limit(limit)
        .skip(page * limit)
        .sort({ nome: -1 });

      return clientes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(cliente: CreateClienteDTO) {
    const existe = await this.clienteModel.find({
      $or: [{ documento: cliente.documento }],
    });

    if (existe.length > 0) {
      throw new BadRequestException('Documento já cadastrados.');
    }

    const create = await (await this.clienteModel.create(cliente)).save();

    return create;
  }

  async findById(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel
      .findById(id)
      .populate('usuario_responsavel');

    return cliente;
  }

  async update(
    cliente_id: string,
    cliente: UpdateClienteDTO,
    usuario_nome: string,
  ) {
    try {
      const isValidId = mongoose.isValidObjectId(cliente_id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const updated = await this.clienteModel.updateOne(
        { _id: cliente_id },
        cliente,
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException(
          'Erro ao atualizar dados do usuário.',
        );
      }

      const cliente_atualizado = await this.clienteModel.findById(cliente_id);
      this.enviaEmailService.notificaoClienteAtualizado(
        cliente_atualizado,
        usuario_nome,
      );

      return cliente_atualizado;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
