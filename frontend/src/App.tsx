import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicosPage from "./pages/ServicosPage";
import TransacoesPage from "./pages/TransacoesPage"; // ✅ import da página com filtros

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="/transacoes" element={<TransacoesPage />} /> {/* ✅ agora usa filtros, loading e tabela */}
      </Routes>
    </Router>
  );
}

export default App;
