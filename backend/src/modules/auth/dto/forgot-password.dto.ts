import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email do usuário.',
  })
  @IsNotEmpty({
    message: 'Campo email é obrigatório.',
  })
  @IsEmail()
  email: string;
}
