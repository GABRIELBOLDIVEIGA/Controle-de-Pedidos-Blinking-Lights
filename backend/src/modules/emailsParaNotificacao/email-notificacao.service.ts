import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailNotificacao } from './schema/emails-notificacao.schema';
import mongoose, { Model } from 'mongoose';
import { CreateEmailNotificacaoDto } from './dto/create-email-notificacao.dto';

@Injectable()
export class EmailNotificacaoService {
  constructor(
    @InjectModel(EmailNotificacao.name)
    private emailNotificacaoModel: Model<EmailNotificacao>,
  ) {}

  async create(email: CreateEmailNotificacaoDto): Promise<EmailNotificacao> {
    const createdEmail = new this.emailNotificacaoModel(email);
    return createdEmail.save();
  }

  async getAll() {
    try {
      const emails = await this.emailNotificacaoModel.find();

      return emails;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOne(id: string, data: Partial<CreateEmailNotificacaoDto>) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const updated = await this.emailNotificacaoModel.updateOne(
        { _id: id },
        data,
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException('Erro ao atualizar dados.');
      }

      return await this.emailNotificacaoModel.findById(id);
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

      return await this.emailNotificacaoModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
