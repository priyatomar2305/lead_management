import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LeadForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
      await api.post("/leads", form);

      navigate("/success");
    } 
      catch (err) {
  

      alert("Submission Failed");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={submit}
          className="bg-white shadow-lg rounded-lg p-8 w-96 space-y-4"
        >
          <h1 className="text-3xl font-bold text-center">Lead Form</h1>

          <input
            className="w-full border p-3 rounded"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />

          <textarea
            className="w-full border p-3 rounded"
            placeholder="Requirement"
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            required
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
