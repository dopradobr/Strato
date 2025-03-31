import TabelaTransacoes from "../components/TabelaTransacoes";

<button
  onClick={() =>
    setFiltros({ cliente: "", servico: [], dataInicio: "", dataFim: "" })
  }
  className="ml-2 px-3 py-1 bg-gray-300 rounded"
>
  Limpar filtros
</button>


export function TransacoesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>
      <TabelaTransacoes />
    </div>
  );
}
