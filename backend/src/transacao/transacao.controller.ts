import { Controller, Post, Get, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xlsx from 'xlsx';
import { Express } from 'express';
import { gerarExcelErros } from './utils/gerar-excel-erros';




@Controller('transacoes')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  create(@Body() dto: CreateTransacaoDto) {
    return this.transacaoService.create(dto);
  }

  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Post('import')
@UseInterceptors(FileInterceptor('file'))
async importarExcel(@UploadedFile() file: Express.Multer.File) {
  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
  const planilha = workbook.Sheets[workbook.SheetNames[0]];
  const linhas = xlsx.utils.sheet_to_json(planilha, { defval: null }) as any[];

  const colunasObrigatorias = ['clienteId', 'servicoId', 'data', 'qtd'];

  // Valida cabeçalho da planilha
  const colunasPlanilha = Object.keys(linhas[0] || {});
  const faltando = colunasObrigatorias.filter(c => !colunasPlanilha.includes(c));

  if (faltando.length > 0) {
    return {
      status: 'erro',
      mensagem: `Colunas obrigatórias ausentes: ${faltando.join(', ')}`,
    };
  }

  const resultados: any[] = [];



    for (const linha of linhas) {
      // Ignora linhas completamente vazias
     if (
      !linha['pedido'] &&
      !linha['clienteId'] &&
      !linha['servicoId'] &&
      !linha['data'] &&
      !linha['sku'] &&
      !linha['qtd'] &&
      !linha['armazem']
     ) {
        continue;
      }


      if (Number(linha['qtd']) <= 0) {
        resultados.push({
          status: 'erro',
          erro: 'Quantidade (qtd) deve ser maior que zero.',
          linha,
        });
        continue;
      }
  
      try {
        const transacao = await this.transacaoService.create({
          pedido: String(linha['pedido']),
          armazem: String(linha['armazem']),
          clienteId: String(linha['clienteId']),
          servicoId: String(linha['servicoId']),
          data: String(linha['data']),
          sku: linha['sku'] ? String(linha['sku']) : undefined,
          qtd: Number(linha['qtd']),
          peso: linha['peso'] ? Number(linha['peso']) : undefined,
          dias: linha['dias'] ? Number(linha['dias']) : undefined,
        });

        resultados.push({ status: 'ok', transacao });
      } catch (erro) {
        resultados.push({ status: 'erro', erro: (erro as Error).message, linha });
      }
    }

    const resumo = {
      sucesso: resultados.filter(r => r.status === 'ok').length,
      erros: resultados.filter(r => r.status === 'erro').length,
    };
    
    let caminhoErros: string | null = null;

const erros = resultados.filter(r => r.status === 'erro');
if (erros.length > 0) {
  caminhoErros = await gerarExcelErros(erros);
}

return {
  resumo,
  detalhes: resultados,
  arquivoErros: caminhoErros,
};

    
  }
}
