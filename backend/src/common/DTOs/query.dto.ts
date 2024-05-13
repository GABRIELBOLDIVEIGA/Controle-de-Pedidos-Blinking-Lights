import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly page: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit: number;

  @IsOptional()
  @IsString()
  // @Transform((valeu) => (valeu.value = 'BATATA'))
  readonly filter: string;
}
