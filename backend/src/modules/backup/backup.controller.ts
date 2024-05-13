import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsDevGuard } from 'src/decorators/dev.guard';
import { BackupService } from './backup.service';
import { Throttle } from '@nestjs/throttler';

@ApiTags('backup')
@ApiBearerAuth('JWT-auth')
@Controller('backup')
export class BackupController {
  constructor(private backupService: BackupService) {}

  @Get('clientes')
  @UseGuards(IsDevGuard)
  async backupClientes(): Promise<string> {
    return this.backupService.backupClientes();
  }

  @Get('condicoes-pagamento')
  @UseGuards(IsDevGuard)
  async backupCondicoesPagamento(): Promise<string> {
    return this.backupService.backupCondicoesPagamento();
  }

  @Get('email-notificacao')
  @UseGuards(IsDevGuard)
  async backupEmailNotificacao(): Promise<string> {
    return this.backupService.backupEmailNotificacao();
  }

  @Get('pedidos')
  @UseGuards(IsDevGuard)
  async backupPedidos(): Promise<string> {
    return this.backupService.backupPedidos();
  }

  @Get('produtos')
  @UseGuards(IsDevGuard)
  async backupProdutos(): Promise<string> {
    return this.backupService.backupProdutos();
  }

  @Get('usuarios')
  @UseGuards(IsDevGuard)
  async backupUsuarios(): Promise<string> {
    return this.backupService.backupUsuarios();
  }

  @Throttle({ default: { limit: 1, ttl: 43200000 } })
  @Get('backup-db')
  async backupDB() {
    await this.backupService.backupClientes();
    await this.backupService.backupCondicoesPagamento();
    await this.backupService.backupEmailNotificacao();
    await this.backupService.backupPedidos();
    await this.backupService.backupPedidos();
    await this.backupService.backupProdutos();
    await this.backupService.backupUsuarios();

    Logger.log('Backup-DB 💾');
    return 'Backup-DB 💾';
  }
}
