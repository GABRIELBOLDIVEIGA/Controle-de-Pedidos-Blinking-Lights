import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/usuario.schemas';
import mongoose, { Model } from 'mongoose';
import { CreateUsuarioDTO } from './dto/create-user.dto';
import { UpdateUsuarioDTO } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import { QueryDTO } from 'src/common/DTOs/query.dto';
import { Permissao } from 'src/common/enums/Permicao';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel(Usuario.name) private userModel: Model<Usuario>) {}

  private buildFilter<TData>(keys: Array<keyof TData>, filter: string) {
    const filtro = keys.map((key) => ({
      [String(key)]: { $regex: filter, $options: 'i' },
    }));

    return { $or: filtro };
  }

  async create(createUserDto: CreateUsuarioDTO): Promise<Usuario> {
    const userExiste = await this.userModel
      .findOne()
      .or([
        { email: createUserDto.email },
        { documento: createUserDto.documento },
      ]);

    if (userExiste) {
      throw new BadRequestException(
        `Email: ${createUserDto.email} ou Documento: ${createUserDto.documento} já cadastrados no sitemas.`,
      );
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      senha: await bcryptjs.hash(createUserDto.senha, 12),
    });
    return createdUser.save();
  }

  async findById(id: string): Promise<Usuario> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const user: Usuario = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findAll({
    limit = 50,
    page = 0,
    filter,
  }: QueryDTO): Promise<Usuario[]> {
    try {
      const filtro = filter
        ? this.buildFilter<Usuario>(
            ['documento', 'email', 'nome', 'telefone'],
            filter,
          )
        : {};

      const usuarios = await this.userModel
        .find()
        .where({ ...filtro })
        .limit(limit)
        .skip(page * limit)
        .sort({ ativo: -1, nome: 1 });

      return usuarios.filter((user) => user.permissao != Permissao.DEV);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateAvatar(url: string, id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Forneça um ID valido.');
      }

      const updated = await this.userModel.updateOne(
        { _id: id },
        { avatar: `${url}${id}` },
      );
      if (!updated.acknowledged) {
        throw new NotImplementedException(
          'Erro ao atualizar dados do usuário.',
        );
      }

      return await this.userModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOne(id: string, updateUser: UpdateUsuarioDTO): Promise<Usuario> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const updated = await this.userModel.updateOne({ _id: id }, updateUser);
    if (!updated.acknowledged) {
      throw new NotImplementedException('Erro ao atualizar dados do usuário.');
    }

    return await this.userModel.findById(id);
  }

  async updateSenha(id: string, novaSenha: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    await this.userModel.findByIdAndUpdate({ _id: id }, { senha: novaSenha });

    return await this.userModel.findById(id);
  }

  async softDeleteOne(id: string): Promise<Usuario> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    const usuario = await this.userModel.findById(id);
    if (usuario.permissao === Permissao.DEV)
      throw new UnauthorizedException(
        '🎉 Parabéns, você tentou apagar o desenvolvedor do sistema... 🚀 Agora vai la fazer login outra vez 🥱',
      );

    const deleted = await this.userModel.updateOne(
      { _id: id },
      { isDeleted: true },
    );
    if (!deleted.acknowledged) {
      throw new NotImplementedException('Erro ao atualizar dados do usuário.');
    }
    return await this.userModel.findById(id);
  }
}
