import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import appConfig from 'src/configuration/app.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.uuid,
      userId: payload.id,
      uuid: payload.uuid,
      nome: payload.nome,
      email: payload.email,
      avatar: payload.avatar,
      telefone: payload.telefone,
      cpf: payload.cpf,
      perfil: payload.perfil,
      ativo: payload.ativo,
    };
  }
}
