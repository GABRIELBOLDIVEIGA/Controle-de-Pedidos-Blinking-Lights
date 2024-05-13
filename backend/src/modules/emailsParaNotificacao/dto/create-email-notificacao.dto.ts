import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailNotificacaoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Nome do Usuário.',
    example: 'João Silva e Silva',
  })
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Email do Usuário.',
    example: 'joaosilvaesilva@email.com',
  })
  readonly email: string;
}
