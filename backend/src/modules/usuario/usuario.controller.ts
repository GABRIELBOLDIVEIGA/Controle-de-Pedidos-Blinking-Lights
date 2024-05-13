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
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { Usuario } from './schemas/usuario.schemas';
import { CreateUsuarioDTO } from './dto/create-user.dto';
import { UpdateUsuarioDTO } from './dto/update-user.dto';
import { IsAdminOrDevGuard } from 'src/decorators/adm.guard';
import { JwtGuard } from '../auth/jwt.guard';

@ApiTags('Usuario')
@ApiBearerAuth('JWT-auth')
@Controller('usuario')
export class UsuarioController {
  constructor(private userService: UsuarioService) {}

  @Post('/admin')
  @UseGuards(IsAdminOrDevGuard)
  async create(@Body() user: CreateUsuarioDTO): Promise<Usuario> {
    return this.userService.create(user);
  }

  @Get('/admin')
  @UseGuards(IsAdminOrDevGuard)
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
  ): Promise<Usuario[]> {
    return await this.userService.findAll({ page, limit, filter });
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiParam({ name: 'id', required: true })
  async findById(@Param('id') id: string): Promise<Usuario> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiParam({ name: 'id', required: true })
  async updateOne(
    @Param('id') id: string,
    @Body() updateUser: UpdateUsuarioDTO,
  ): Promise<Usuario> {
    return this.userService.updateOne(id, updateUser);
  }

  @Delete('/admin/:id')
  @UseGuards(IsAdminOrDevGuard)
  @ApiParam({ name: 'id', required: true })
  async deleteOne(@Param('id') id: string): Promise<Usuario> {
    return this.userService.softDeleteOne(id);
  }
}
