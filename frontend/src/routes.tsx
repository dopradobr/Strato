import { Home } from "./pages/Home";
import { TransacoesPage } from "./pages/TransacoesPage"; // <-- Adicione essa linha
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="transacoes" element={<TransacoesPage />} /> {/* <-- E essa */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
