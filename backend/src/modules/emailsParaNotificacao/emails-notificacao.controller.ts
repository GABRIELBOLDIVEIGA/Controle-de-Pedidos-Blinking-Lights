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
import { IsAdminOrDevGuard } from 'src/decorators/adm.guard';
import { EmailNotificacaoService } from './email-notificacao.service';
import { CreateEmailNotificacaoDto } from './dto/create-email-notificacao.dto';
import { EmailNotificacao } from './schema/emails-notificacao.schema';

@ApiTags('EmailNotificacao')
@ApiBearerAuth('JWT-auth')
@Controller('emailNotificacao')
export class EmailNoficicacaoController {
  constructor(private emailNotificacaoService: EmailNotificacaoService) {}

  @Post('/admin')
  @UseGuards(IsAdminOrDevGuard)
  async cadastrarEmail(
    @Body() email: CreateEmailNotificacaoDto,
  ): Promise<EmailNotificacao> {
    return this.emailNotificacaoService.create(email);
  }

  @Get()
  @UseGuards(IsAdminOrDevGuard)
  async getAll() {
    return this.emailNotificacaoService.getAll();
  }

  @Patch(':id')
  @UseGuards(IsAdminOrDevGuard)
  async updateOne(
    @Param('id') id: string,
    @Body() data: Partial<CreateEmailNotificacaoDto>,
  ) {
    return this.emailNotificacaoService.updateOne(id, data);
  }

  @Delete('/delete/:id')
  async deletar(@Param('id') id: string) {
    return this.emailNotificacaoService.delete(id);
  }
}
