import { useEffect, useState } from "react";
import axios from "axios";
import TabelaTransacoes from "../components/TabelaTransacoes";

const TransacoesPage = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filtros, setFiltros] = useState({
    cliente: "",
    servico: [],
    dataInicio: "",
    dataFim: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get("http://localhost:3000/transacoes", {
          params: filtros,
        });
        setTransacoes(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filtros]);

  // Função para limpar os filtros
  const limparFiltros = () => {
    setFiltros({
      cliente: "",
      servico: [],
      dataInicio: "",
      dataFim: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>

      {/* Filtros */}
      <div className="mb-4 flex flex-col md:flex-row gap-2 items-start md:items-end">
        <input
          type="text"
          placeholder="Cliente"
          value={filtros.cliente}
          onChange={(e) =>
            setFiltros({ ...filtros, cliente: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />

        <input
          type="date"
          value={filtros.dataInicio}
          onChange={(e) =>
            setFiltros({ ...filtros, dataInicio: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />

        <input
          type="date"
          value={filtros.dataFim}
          onChange={(e) =>
            setFiltros({ ...filtros, dataFim: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />

        {/* Botão de limpar filtros */}
        <button
          onClick={limparFiltros}
          className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded"
        >
          Limpar filtros
        </button>
      </div>

      {/* Exibição condicional com loading */}
      {loading ? (
        <p className="text-center mt-4 text-gray-600">Carregando transações...</p>
      ) : (
        <TabelaTransacoes transacoes={transacoes} />
      )}
    </div>
  );
};

export default TransacoesPage;
