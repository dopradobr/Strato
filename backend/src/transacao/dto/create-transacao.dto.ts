import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransacaoDto {

  @IsNotEmpty()
  @IsString()
  pedido: string;

  @IsNotEmpty()
  @IsString()
  armazem: string;

  @IsNotEmpty()
  @IsString()
  clienteId: string;

  @IsNotEmpty()
  @IsString()
  servicoId: string;

  @IsNotEmpty()
  @IsDateString()
  data: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsNotEmpty()
  @IsNumber()
  qtd: number;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsNumber()
  dias?: number; // para armazenagem diária
}
