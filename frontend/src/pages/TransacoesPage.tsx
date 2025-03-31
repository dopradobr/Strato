import TabelaTransacoes from "../components/TabelaTransacoes";

export function TransacoesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>
      <TabelaTransacoes />
    </div>
  );
}
