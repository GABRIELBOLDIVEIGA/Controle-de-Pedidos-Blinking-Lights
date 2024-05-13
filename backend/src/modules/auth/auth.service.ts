import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import appConfig from 'src/configuration/app.config';
import { JwtDTO } from './dto/jwt.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { criaSenha } from './rand-password';
import { EnviaEmailService } from '../enviar-email/enviar-email.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
    private enviaEmailService: EnviaEmailService,
  ) {}

  async signIn(loginUsuarioDto: LoginUsuarioDto): Promise<{ token: string }> {
    const user = await this.usuarioService.findByEmail(loginUsuarioDto.email);

    if (!user) {
      throw new NotFoundException(['Usuário não cadastrado!']);
    }
    if (!user.ativo) {
      throw new ForbiddenException(['Usuário inativo!']);
    }

    if (!(await bcryptjs.compare(loginUsuarioDto.senha, user?.senha))) {
      throw new ForbiddenException(['Usuário ou Senha inválidos!']);
    }

    const payload: Partial<JwtDTO> = {
      sub: user._id,
      user_id: user._id,
      nome: user.nome,
      email: user.email,
      avatar: user.avatar,
      telefone: user.telefone,
      documento: user.documento,
      permissao: user.permissao,
      ativo: user.ativo,
    };

    const token = this.jwtService.sign(payload, {
      privateKey: appConfig().appSecret,
    });

    return { token };
  }

  async updatePassword(changePassword: ChangePasswordDto) {
    try {
      const login = await this.signIn({
        email: changePassword.email,
        senha: changePassword.senha,
      });

      if (login.token) {
        const payload: Partial<JwtDTO> = await this.jwtService.verifyAsync(
          login.token,
          {
            secret: appConfig().appSecret,
          },
        );

        const novaSenhaHash: string = await bcryptjs.hash(
          changePassword.novaSenha,
          12,
        );

        const usuario_atualizado = await this.usuarioService.updateSenha(
          payload.user_id,
          novaSenhaHash,
        );

        return await this.signIn({
          email: usuario_atualizado.email,
          senha: changePassword.novaSenha,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error.response.message[0]);
    }
  }

  async forgotPassword(data: ForgotPasswordDto) {
    try {
      const senha_rand = criaSenha();
      console.log('[Nova Senha] => ', senha_rand);

      const usuario = await this.usuarioService.findByEmail(data.email);

      const novaSenhaHash: string = await bcryptjs.hash(senha_rand, 12);

      const usuario_atualizado = await this.usuarioService.updateSenha(
        usuario._id,
        novaSenhaHash,
      );

      if (usuario_atualizado) {
        await this.enviaEmailService.esqueciMinhaSenha(
          usuario.email,
          senha_rand,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
