import { useEffect, useState } from "react";
import axios from "axios";
import TabelaTransacoes from "../components/TabelaTransacoes";

const TransacoesPage = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(false); // controla o carregamento

  const [filtros, setFiltros] = useState({
    cliente: "",
    servico: [],
    dataInicio: "",
    dataFim: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // inicia carregamento

      try {
        const { data } = await axios.get("http://localhost:3000/transacoes", {
          params: filtros,
        });
        setTransacoes(data); // define os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false); // encerra carregamento
      }
    };

    fetchData();
  }, [filtros]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>

      {/* Filtros */}
      <div className="mb-4 flex flex-col md:flex-row gap-2">
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
