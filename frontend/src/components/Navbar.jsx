import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Lead Manager</h1>

        <div className="space-x-5">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
