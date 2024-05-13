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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Produto } from './schemas/produto.schemas';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProdutoService } from './produto.service';
import { IsAdminOrDevGuard } from 'src/decorators/adm.guard';
import { JwtGuard } from '../auth/jwt.guard';
import { boolean } from 'zod';

@ApiTags('Produto')
@ApiBearerAuth('JWT-auth')
@Controller('produto')
export class ProdutoController {
  constructor(private productService: ProdutoService) {}

  @Post('/admin')
  @UseGuards(IsAdminOrDevGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Produto> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'promocao_ativa', required: false, type: Boolean })
  async findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('promocao_ativa') promocao_ativa,
  ): Promise<Produto[]> {
    return this.productService.findAll({
      page,
      limit,
      filter,
      promocao_ativa,
    });
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findById(@Param('id') id: string): Promise<Produto> {
    return this.productService.findById(id);
  }

  @Patch('/admin/update/:id')
  @UseGuards(IsAdminOrDevGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Produto> {
    return this.productService.updateOne(id, updateProductDto);
  }

  @Delete('/admin/delete/:id')
  @UseGuards(IsAdminOrDevGuard)
  async delete(@Param('id') id: string): Promise<Produto> {
    return this.productService.softDelete(id);
  }
}
