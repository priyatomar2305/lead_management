import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LeadForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
       api.post("/leads", form);

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        requirement: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center px-4 py-10">
        <form
          onSubmit={submit}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-5"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Lead Form
          </h1>

          <p className="text-center text-gray-500">
            Fill in the details below.
          </p>

          {success && (
            <div className="bg-green-100 border border-green-500 text-green-700 p-3 rounded-lg text-center">
              ✅ Lead submitted successfully. Redirecting to dashboard...
            </div>
          )}

          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Company Name"
            name="company"
            value={form.company}
            onChange={handleChange}
          />

          <textarea
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Requirement"
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              "Submit Lead"
            )}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
