import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4">Page Not Found</p>

      <Link to="/" className="mt-6 bg-blue-600 text-white px-5 py-3 rounded">
        Home
      </Link>
    </div>
  );
}
