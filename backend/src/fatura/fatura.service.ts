import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { FaturaPdfService } from './pdf/fatura-pdf.service';


const prisma = new PrismaClient();

@Injectable()
export class FaturaService {
  async gerarFatura(dto: CreateFaturaDto) {
    const { clienteId, periodoDe, periodoAte } = dto;

    const transacoes = await prisma.transacao.findMany({
      where: {
        clienteId,
        data: {
          gte: new Date(periodoDe),
          lte: new Date(periodoAte),
        },
        faturaId: null,
        status: 'pendente',
      },
    });

    if (transacoes.length === 0) {
      throw new Error('Nenhuma transação pendente encontrada para o período informado.');
    }

    const valorTotal = transacoes.reduce((acc, t) => acc + t.valorTotal, 0);

    const fatura = await prisma.fatura.create({
      data: {
        clienteId,
        periodoDe: new Date(periodoDe),
        periodoAte: new Date(periodoAte),
        valorTotal,
        status: 'gerada',
      },
    });

    await prisma.transacao.updateMany({
      where: {
        id: { in: transacoes.map((t) => t.id) },
      },
      data: {
        faturaId: fatura.id,
        status: 'faturado',
      },
    });

    return fatura;
  }

  async listar() {
    return await prisma.fatura.findMany({
      include: {
        cliente: true,
        transacoes: true,
      },
    });
  }

  async gerarPdf(id: string) {
    const fatura = await prisma.fatura.findUnique({
      where: { id },
      include: {
        transacoes: {
          include: {
            servico: true,
          },
        },
      },
    });
  
    if (!fatura) throw new Error('Fatura não encontrada');
  
    const caminhoPdf = await FaturaPdfService.gerar(fatura as any);
    return { caminho: caminhoPdf };
  }
  

}
