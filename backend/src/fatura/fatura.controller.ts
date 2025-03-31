import { FaturaService } from './fatura.service';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { Param, Controller, Get, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';

@Controller('faturas')
export class FaturaController {
  constructor(private readonly faturaService: FaturaService) {}

  @Post()
  gerar(@Body() dto: CreateFaturaDto) {
    return this.faturaService.gerarFatura(dto);
  }

  @Get()
  listar() {
    return this.faturaService.listar();
  }

  @Get(':id/pdf/download')
async downloadPdf(@Param('id') id: string, @Res() res: Response) {
  const { caminho } = await this.faturaService.gerarPdf(id);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="fatura-${id}.pdf"`,
  });

  res.sendFile(caminho);
  }


  @Get(':id/pdf')
async gerarPdf(@Param('id') id: string) {
  return this.faturaService.gerarPdf(id);
  }

}
