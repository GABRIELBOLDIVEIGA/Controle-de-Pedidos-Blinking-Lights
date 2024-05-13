import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { Permissao } from 'src/common/enums/Permicao';
import { IsValidMongooseId } from 'src/pipe/isValidMongooseId.pipe';

export class JwtDTO {
  @Validate(IsValidMongooseId)
  readonly sub: string;

  @Validate(IsValidMongooseId)
  readonly user_id: string;

  @IsNotEmpty()
  @IsString()
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @IsNotEmpty()
  @IsString()
  readonly telefone: string;

  @IsNotEmpty()
  @IsString()
  readonly documento: string;

  @IsEnum(Permissao)
  readonly permissao: Permissao;

  @IsBoolean()
  readonly ativo: boolean;

  @IsNumber()
  readonly iat: number;
}
