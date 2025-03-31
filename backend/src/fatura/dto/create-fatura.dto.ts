import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateFaturaDto {
  @IsNotEmpty()
  @IsString()
  clienteId: string;

  @IsNotEmpty()
  @IsDateString()
  periodoDe: string;

  @IsNotEmpty()
  @IsDateString()
  periodoAte: string;
}

