import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

export async function gerarExcelErros(linhasComErro: any[]): Promise<string> {
  const linhasComErroTratadas = linhasComErro.map((l: any) => ({
    ...l.linha,
    erro: l.erro,
  }));

  const ws = xlsx.utils.json_to_sheet(linhasComErroTratadas);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Erros');

  const nomeArquivo = `erros-import-${uuid()}.xlsx`;
  const caminho = path.join(__dirname, '..', '..', '..', 'tmp', nomeArquivo);

  fs.mkdirSync(path.dirname(caminho), { recursive: true });

  xlsx.writeFile(wb, caminho);

  return caminho;
}
