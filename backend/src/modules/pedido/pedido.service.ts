import { InjectModel } from '@nestjs/mongoose';
import { Pedido } from './schemas/pedido.schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreatePedidoDTO } from './dto/create-pedido.dto';
import { QueryDTO } from 'src/common/DTOs/query.dto';
import { Etapa } from './Enum/Etapa';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';
import { EmailNotificacaoService } from '../emailsParaNotificacao/email-notificacao.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    private enviaEmailService: EnviaEmailService,
    private mailNotificacaoService: EmailNotificacaoService,
  ) {}

  private generateCode(etapa: Etapa, quantidadeDePedidos: number): string {
    const initial_code = 580; // começar do 0 iria dar problema com o atual sistema do cliente.

    const numeroDoPedido = (initial_code + quantidadeDePedidos + 1)
      .toString()
      .split('');

    for (; numeroDoPedido.length < 6; ) {
      numeroDoPedido.splice(0, 0, '0');
    }

    switch (etapa) {
      case Etapa.ORCAMENTO:
        return `OR${numeroDoPedido.join('')}`;
      case Etapa.ANALISE:
        return `AN${numeroDoPedido.join('')}`;
      case Etapa.FINALIZADO:
        return `PD${numeroDoPedido.join('')}`;
    }
  }

  async createPedido(pedido: CreatePedidoDTO) {
    try {
      const pedidos_count = await this.pedidoModel
        .find()
        // .find({ etapa: pedido.etapa })
        .count();

      const codigo = this.generateCode(pedido.etapa, pedidos_count);

      const pedido_gerado = await (
        await this.pedidoModel.create({ ...pedido, codigo })
      ).save();

      if (pedido_gerado.etapa === Etapa.ANALISE) {
        this.enviaEmailService.noficacaoNovoPedido(
          pedido_gerado._id,
          pedido_gerado.usuario,
        );
      }

      return pedido_gerado;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async clonar(id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const base = await this.findOne(id);
      let clone: CreatePedidoDTO = {
        ...base,
        usuario: base.usuario,
        cliente: base.cliente,
        etapa: Etapa.ORCAMENTO,
        produtos: base.produtos.map((p) => ({ ...p, item: p.item })),
      };

      return await this.createPedido(clone);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async confirmPedido(pedido_id: string, pedido: Partial<CreatePedidoDTO>) {
    try {
      const isValidId = mongoose.isValidObjectId(pedido_id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const pedidos_count = await this.pedidoModel
        .find({ etapa: Etapa.FINALIZADO })
        .count();

      const codigo = this.generateCode(Etapa.FINALIZADO, pedidos_count);

      const updated = await this.pedidoModel.updateOne(
        { _id: pedido_id },
        { ...pedido, etapa: Etapa.FINALIZADO, codigo },
      );

      if (!updated.acknowledged) {
        throw new NotImplementedException('Erro ao atualizar dados do pedido.');
      }

      return await this.pedidoModel.findById(pedido_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editar(id: string, form: CreatePedidoDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const updated = await this.pedidoModel.updateOne({ _id: id }, form);
    if (!updated.acknowledged) {
      throw new NotImplementedException('Erro ao atualizar dados do pedido.');
    }

    return await this.pedidoModel.findById(id);
  }

  async getAllOrcamentos({ limit = 1000, page = 0, filter }: QueryDTO) {
    try {
      const orcamentos = await this.pedidoModel
        .find({ etapa: Etapa.ORCAMENTO })
        .where({ isDeleted: false })
        .limit(limit)
        .skip(page * limit)
        .populate('cliente')
        .populate('usuario')
        .sort({ createdAt: -1 })
        .populate({ path: 'produtos.item' })
        .exec();

      return orcamentos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllPedidos({
    limit = 1000,
    page = 0,
    filter,
    etapa,
  }: QueryDTO & { etapa?: Etapa }) {
    try {
      let etapa_query = null;

      if (!etapa)
        etapa_query = {
          $or: [{ etapa: Etapa.ANALISE }, { etapa: Etapa.FINALIZADO }],
        };

      const pedidos = await this.pedidoModel
        .find(etapa_query ? etapa_query : { etapa: etapa })
        .where({ isDeleted: false })
        .limit(limit)
        .skip(page * limit)
        .populate('cliente')
        .populate('usuario')
        .sort({ etapa: 1, createdAt: -1 })
        .populate({ path: 'produtos.item' })
        .exec();

      return pedidos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOrcamentoByUser({
    user_id,
    limit = 1000,
    page = 0,
  }: { user_id: string } & Partial<QueryDTO>) {
    try {
      const orcamentos = await this.pedidoModel
        .find({ etapa: Etapa.ORCAMENTO })
        .where({ usuario: user_id, isDeleted: false })
        .limit(limit)
        .skip(page * limit)
        .populate('cliente')
        .populate('usuario')
        .sort({ createdAt: -1 })
        .populate({ path: 'produtos.item' })
        .exec();

      return orcamentos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPedidosByUser({
    user_id,
    limit = 1000,
    page = 0,
    etapa,
  }: { user_id: string } & Partial<QueryDTO> & { etapa?: Etapa }) {
    try {
      let etapa_query = null;

      if (!etapa)
        etapa_query = {
          $or: [{ etapa: Etapa.ANALISE }, { etapa: Etapa.FINALIZADO }],
        };

      const pedidos = await this.pedidoModel
        .find(etapa_query ? etapa_query : { etapa: etapa })
        .where({ usuario: user_id, isDeleted: false })
        .limit(limit)
        .skip(page * limit)
        .populate('cliente')
        .populate('usuario')
        .sort({ etapa: 1, createdAt: -1 })
        .populate({ path: 'produtos.item' })
        .exec();

      return pedidos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.pedidoModel
        .findById(id)
        .populate('cliente')
        .populate('usuario')
        .populate({ path: 'produtos.item' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async marcaOrcamentoComoUsado(id: string) {
    try {
      const updated = await this.pedidoModel.updateOne(
        { _id: id },
        { utilizado_como_orcamento: true },
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException('Atualização do orçamento falhou.');
      }
      return await this.pedidoModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const updated = await this.pedidoModel.updateOne(
        { _id: id },
        { isDeleted: true },
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException('Erro ao deletar pedido.');
      }

      return await this.pedidoModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
