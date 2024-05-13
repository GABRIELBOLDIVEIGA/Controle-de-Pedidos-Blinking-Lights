import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Permissao } from 'src/common/enums/Permicao';
import appConfig from 'src/configuration/app.config';

import { JwtDTO } from 'src/modules/auth/dto/jwt.dto';

export interface RequestWhitUser extends Request {
  user: Partial<JwtDTO>;
}

@Injectable()
export class IsDevGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWhitUser>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: Partial<JwtDTO> = await this.jwtService.verifyAsync(
        token,
        {
          secret: appConfig().appSecret,
        },
      );

      if (
        payload.permissao != Permissao.ADM &&
        payload.permissao != Permissao.DEV
      )
        throw new UnauthorizedException('Usuário não está autorizado!');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
