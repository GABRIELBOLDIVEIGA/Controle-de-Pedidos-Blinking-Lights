import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { ProdutoService } from '../produto/produto.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configsService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configsService.getOrThrow(
        'ALTERNATIVE_AWS_ACCESS_KEY_ID',
      ),
      secretAccessKey: this.configsService.getOrThrow(
        'ALTERNATIVE_AWS_SECRET_ACCESS_KEY',
      ),
    },
  });

  private expires_in(days_aread: number): Date {
    var now = new Date();
    now.setDate(now.getDate() + days_aread);
    return now;
  }

  constructor(
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private readonly configsService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async upload() {
    return '[Upload]';
  }

  async uploadAvatar(id: string, file: Buffer) {
    try {
      const folder = 'avatar/';

      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `${folder}${id}`,
          Body: file,
          ContentType: 'mimetype',
          ACL: 'public-read',
        }),
      );

      if (response.$metadata.httpStatusCode === 200) {
        const base_url = this.configsService.getOrThrow('AWS_S3_BUCKET_URL');

        await this.usuarioService.updateAvatar(`${base_url}${folder}`, id);
      }

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadProduto(id: string, file: Buffer) {
    try {
      const folder = 'produtos/';
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `${folder}${id}`,
          Body: file,
          ContentType: 'mimetype',
          ACL: 'public-read',
        }),
      );

      if (response.$metadata.httpStatusCode === 200) {
        const base_url = this.configsService.getOrThrow('AWS_S3_BUCKET_URL');

        await this.produtoService.updateImagemProduto(
          `${base_url}${folder}`,
          id,
        );
      }

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Backup-DB 💾
  async uploadBackupClientes(str: string) {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `schedule/clientes-${new Date().toISOString()}`,
          Body: str,
          ContentType: 'mimetype',
          ACL: 'bucket-owner-read',
          Expires: this.expires_in(7),
        }),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadBackupCondicoesPagamento(str: string) {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `schedule/condicoes-pagamento-${new Date().toISOString()}`,
          Body: str,
          ContentType: 'mimetype',
          ACL: 'bucket-owner-read',
          Expires: this.expires_in(7),
        }),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadBackupEmailNotificacao(str: string) {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `schedule/emails-notificacao-${new Date().toISOString()}`,
          Body: str,
          ContentType: 'mimetype',
          ACL: 'bucket-owner-read',
          Expires: this.expires_in(7),
        }),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadBackupPedidos(str: string) {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `schedule/pedidos-${new Date().toISOString()}`,
          Body: str,
          ContentType: 'mimetype',
          ACL: 'bucket-owner-read',
          Expires: this.expires_in(7),
        }),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadBackupProdutos(str: string) {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `schedule/produtos-${new Date().toISOString()}`,
          Body: str,
          ContentType: 'mimetype',
          ACL: 'bucket-owner-read',
          Expires: this.expires_in(7),
        }),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadBackupUsuarios(str: string) {
    try {
      const response = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'kmb-nestjs-uploader',
          Key: `schedule/usuarios-${new Date().toISOString()}`,
          Body: str,
          ContentType: 'mimetype',
          ACL: 'bucket-owner-read',
          Expires: this.expires_in(7),
        }),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
