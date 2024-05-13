import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateClienteDTO } from './dto/create-client.dto';
import { ClienteService } from './cliente.service';
import { IsAdminOrDevGuard } from 'src/decorators/adm.guard';
import { JwtGuard } from '../auth/jwt.guard';
import { UpdateClienteDTO } from './dto/update-client.dto';

@ApiTags('Cliente')
@ApiBearerAuth('JWT-auth')
@Controller('cliente')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get('/admin')
  @UseGuards(IsAdminOrDevGuard)
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async getAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
  ) {
    return this.clienteService.getAll({ page, limit, filter });
  }

  @Get('/admin/table')
  @UseGuards(IsAdminOrDevGuard)
  async allForTable() {
    return this.clienteService.getAllForTable();
  }

  @Get('/ClientesByUserId')
  @UseGuards(JwtGuard)
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async getClientesByUserId(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Request() req,
  ) {
    return this.clienteService.clientesByUserId({
      page,
      limit,
      filter,
      ...req.user,
    });
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createClienteDto: CreateClienteDTO) {
    return this.clienteService.create(createClienteDto);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiParam({ name: 'id', required: true })
  async get(@Param('id') id: string) {
    return this.clienteService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(
    @Req() req,
    @Param('id') cliente_id: string,
    @Body() clienteDTO: UpdateClienteDTO,
  ) {
    return this.clienteService.update(cliente_id, clienteDTO, req.user.nome);
  }
}
