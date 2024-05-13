import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePedidoDTO } from './dto/create-pedido.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { IsAdminOrDevGuard } from 'src/decorators/adm.guard';
import { PedidoService } from './pedido.service';
import { Etapa } from './Enum/Etapa';

@ApiTags('Pedido')
@ApiBearerAuth('JWT-auth')
@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() pedido: CreatePedidoDTO) {
    return this.pedidoService.createPedido(pedido);
  }

  @Post('/clonar/:id')
  async clonarPedidoOuOrcamento(@Param('id') id: string) {
    return this.pedidoService.clonar(id);
  }

  @Get('/admin')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'etapa', required: false, enum: Etapa })
  @UseGuards(IsAdminOrDevGuard)
  async getAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('etapa') etapa: Etapa | undefined,
  ) {
    switch (etapa) {
      case Etapa.ORCAMENTO:
        return this.pedidoService.getAllOrcamentos({
          page,
          limit,
          filter,
        });

      case Etapa.ANALISE:
        return this.pedidoService.getAllPedidos({ page, limit, filter, etapa });

      case Etapa.FINALIZADO:
        return this.pedidoService.getAllPedidos({ page, limit, filter, etapa });

      default:
        return this.pedidoService.getAllPedidos({ page, limit, filter });
    }
  }

  @Patch('/admin/confirmar/:id')
  @ApiParam({ name: 'id', required: true })
  @UseGuards(IsAdminOrDevGuard)
  async confirmarPedido(
    @Body() pedido: CreatePedidoDTO,
    @Param('id') id: string,
  ) {
    return this.pedidoService.confirmPedido(id, pedido);
  }

  @Patch('/editar/:id')
  @ApiParam({ name: 'id', required: true })
  async editar(@Body() form: CreatePedidoDTO, @Param('id') id: string) {
    return this.pedidoService.editar(id, form);
  }

  @Patch('/marca-orcamento-como-usado/:id')
  @ApiParam({ name: 'id', required: true })
  async marcaOrcamentoComoUsado(@Param('id') id: string) {
    return this.pedidoService.marcaOrcamentoComoUsado(id);
  }

  @Get('/orcamentos_do_usuario/:user_uuid')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @UseGuards(JwtGuard)
  async getOrcamentosByUser(
    @Param('user_uuid') user_id: string,
    @Query('page') page,
    @Query('limit') limit,
  ) {
    return this.pedidoService.getOrcamentoByUser({
      user_id,
      page,
      limit,
    });
  }

  @Get('/pedidos_do_usuario/:user_uuid')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({
    name: 'etapa',
    required: false,
    enum: [Etapa.ANALISE, Etapa.FINALIZADO],
  })
  @UseGuards(JwtGuard)
  async getPedidosByUser(
    @Param('user_uuid') user_id: string,
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('etapa') etapa: Etapa | undefined,
  ) {
    return this.pedidoService.getPedidosByUser({
      user_id,
      limit,
      page,
      etapa,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.pedidoService.delete(id);
  }
}
