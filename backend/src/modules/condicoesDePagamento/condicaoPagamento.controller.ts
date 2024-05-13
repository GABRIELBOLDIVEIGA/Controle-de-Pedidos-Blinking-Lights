import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CondicaoDePagamentoService } from './condicaoPagamento.service';
import { CreateCondicaoDePagamentoDto } from './dto/create-condicaoDePagamento.tdo';
import { CondicaoDePagamento } from './schema/condicaoDePagamento.schema';
import { IsAdminOrDevGuard } from 'src/decorators/adm.guard';
import { JwtGuard } from '../auth/jwt.guard';

@ApiTags('CondicaoDePagamento')
@ApiBearerAuth('JWT-auth')
@Controller('condicaoDePagamento')
export class CondicaoDePagamentoController {
  constructor(private condicaoDePagamentoService: CondicaoDePagamentoService) {}

  @Post('/admin')
  @UseGuards(IsAdminOrDevGuard)
  async createCondicaoDePagamento(
    @Body() createCondicaoDePagamentoDto: CreateCondicaoDePagamentoDto,
  ): Promise<CondicaoDePagamento> {
    return this.condicaoDePagamentoService.create(createCondicaoDePagamentoDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAll(): Promise<CondicaoDePagamento[]> {
    return this.condicaoDePagamentoService.getAll();
  }

  @Patch('/update/:id')
  @UseGuards(IsAdminOrDevGuard)
  async update(
    @Param('id') id: string,
    @Body() condicao: CreateCondicaoDePagamentoDto,
  ) {
    return this.condicaoDePagamentoService.updateOne(id, condicao);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: string) {
    return this.condicaoDePagamentoService.delete(id);
  }
}
