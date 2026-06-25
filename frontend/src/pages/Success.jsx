import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-green-600 font-bold">Lead Submitted</h1>

      <Link to="/" className="mt-6 bg-blue-600 text-white px-5 py-3 rounded">
        Submit Another
      </Link>
    </div>
  );
}
