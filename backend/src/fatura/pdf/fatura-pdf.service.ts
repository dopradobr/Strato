const PDFDocument = require('pdfkit');
import { Fatura, Transacao } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

interface FaturaComTransacoes extends Fatura {
  transacoes: (Transacao & {
    servico: { nome: string };
  })[];
}

export class FaturaPdfService {
  static async gerar(fatura: FaturaComTransacoes): Promise<string> {
    const doc = new PDFDocument();
    const nomeArquivo = `fatura-${fatura.id}.pdf`;
    const caminho = path.join(__dirname, nomeArquivo);
    const stream = fs.createWriteStream(caminho);

    doc.pipe(stream);

    // Cabeçalho
    doc.fontSize(18).text('FATURA - Billing 3PL', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Cliente ID: ${fatura.clienteId}`);
    doc.text(`Período: ${fatura.periodoDe.toISOString().substring(0, 10)} até ${fatura.periodoAte.toISOString().substring(0, 10)}`);
    doc.text(`Data de emissão: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Tabela
    doc.fontSize(14).text('Transações:', { underline: true });
    doc.moveDown(0.5);

    fatura.transacoes.forEach((t) => {
      doc
        .fontSize(10)
        .text(`• SKU: ${t.sku || '-'} | Serviço: ${t.servico.nome} | Qtd: ${t.qtd} | Total: R$ ${t.valorTotal.toFixed(2)}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`TOTAL DA FATURA: R$ ${fatura.valorTotal.toFixed(2)}`, { align: 'right' });

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(caminho));
      stream.on('error', reject);
    });
  }
}
