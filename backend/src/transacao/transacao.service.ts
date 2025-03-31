import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTransacaoDto } from './dto/create-transacao.dto';

import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

export async function gerarExcelErros(linhasComErro: any[]): Promise<string> {
  const linhasComErroTratadas = linhasComErro.map(l => ({
    ...l.linha,
    erro: l.erro
  }));

  const ws = xlsx.utils.json_to_sheet(linhasComErroTratadas);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Erros');

  const nomeArquivo = `erros-import-${uuid()}.xlsx`;
  const caminho = path.join(__dirname, '..', '..', 'tmp', nomeArquivo);

  // Garante que a pasta tmp exista
  fs.mkdirSync(path.dirname(caminho), { recursive: true });

  xlsx.writeFile(wb, caminho);

  return caminho;
}


const prisma = new PrismaClient();

@Injectable()
export class TransacaoService {
  async create(data: CreateTransacaoDto) {
    try {
      const { clienteId, servicoId, qtd, peso, dias } = data;
  
      const servico = await prisma.servico.findUnique({ where: { id: servicoId } });
      if (!servico) throw new Error('Serviço não encontrado');
  
      let valorUnit = servico.valorUnit;
      let valorTotal = 0;
  
      switch (servico.criterioCobranca) {
        case 'volume':
          valorTotal = qtd * valorUnit;
          break;
        case 'peso':
          valorTotal = (peso ?? 0) * valorUnit;
          break;
        case 'tempo_diario':
          valorTotal = (dias ?? 1) * valorUnit;
          break;
        case 'tempo_mensal':
          valorTotal = valorUnit;
          break;
        case 'fixa':
          valorTotal = valorUnit;
          break;
        case 'variavel':
          valorTotal = 0;
          break;
        default:
          throw new Error(`Critério de cobrança não reconhecido: ${servico.criterioCobranca}`);
      }
  
      return await prisma.transacao.create({
        data: {
          ...data,
          data: new Date(data.data),
          valorUnit,
          valorTotal,
        },
      });
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  }
  async findAll() {
    return await prisma.transacao.findMany({
      include: {
        cliente: true,
        servico: true,
      },
    });
  }
  
  
}
