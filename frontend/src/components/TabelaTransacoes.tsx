import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface Transacao {
  id: string;
  pedido: string;
  cliente: {
    nome: string;
  };
  servico: {
    nome: string;
  };
  qtd: number;
  armazem: string;
  valorUnit: number;
  valorTotal: number;
}

export default function TabelaTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const res = await fetch("http://localhost:3000/transacoes");
        const data = await res.json();
        setTransacoes(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransacoes();
  }, []);

  const exportToExcel = () => {
    const data = transacoes.map((t) => ({
      Pedido: t.pedido,
      Cliente: t.cliente.nome,
      Serviço: t.servico.nome,
      Quantidade: t.qtd,
      Armazém: t.armazem,
      "Valor Unit.": t.valorUnit,
      "Valor Total": t.valorTotal,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transações");
    XLSX.writeFile(wb, "transacoes.xlsx");
  };

  if (loading) {
    return <div className="text-center mt-10">Carregando transações...</div>;
  }

  if (transacoes.length === 0) {
    return <div className="text-center mt-10">Nenhuma transação encontrada.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Transações</h2>
        <button
          onClick={exportToExcel}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Exportar Excel
        </button>
      </div>
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Pedido</th>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Serviço</th>
            <th className="p-2 border">Qtd</th>
            <th className="p-2 border">Armazém</th>
            <th className="p-2 border">Valor Unit.</th>
            <th className="p-2 border">Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-2 border">{t.pedido}</td>
              <td className="p-2 border">{t.cliente.nome}</td>
              <td className="p-2 border">{t.servico.nome}</td>
              <td className="p-2 border">{t.qtd}</td>
              <td className="p-2 border">{t.armazem}</td>
              <td className="p-2 border">R$ {t.valorUnit.toFixed(2)}</td>
              <td className="p-2 border">R$ {t.valorTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
