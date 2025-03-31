import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Strato</h1>
        <ul className="flex space-x-6">
          <li><Link to="/">Serviços</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/transacoes">Transações</Link></li>
          <li><Link to="/faturas">Faturas</Link></li>
        </ul>
      </div>
    </nav>
  );
}
