import { IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServicoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  tipoServico: string;

  @IsNotEmpty()
  @IsNumber()
  valorUnit: number;

  @IsNotEmpty()
  @IsString()
  unidade: string;

  @IsNotEmpty()
  @IsString()
  criterioCobranca: 'volume' | 'peso' | 'tempo_diario' | 'tempo_mensal' | 'fixa' | 'variavel';

  @IsNotEmpty()
  @IsString()
  tipoRegra: 'fixo' | 'quantidade_minima' | 'faixa' | 'desconto_progressivo';

  @IsOptional()
  valorRegra?: any;

  @IsOptional()
  @IsString()
  periodicidade?: 'unico' | 'mensal' | 'anual';

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
