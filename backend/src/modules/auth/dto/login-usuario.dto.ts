import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @ApiProperty({
    description: 'Email do usuário.',
  })
  @IsNotEmpty({
    message: 'Campo email é obrigatório.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha de acesso.',
  })
  @IsNotEmpty({
    message: 'Campo senha é obrigatória.',
  })
  @MinLength(6, { message: 'Senha deve ter ao menos 6 caracteres.' })
  senha: string;
}
