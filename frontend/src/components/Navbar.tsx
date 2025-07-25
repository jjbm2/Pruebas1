import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">NeuroSalud</h1>
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Registro</Link>
          <Link to="/symptoms" className="hover:text-gray-300">Síntomas</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
