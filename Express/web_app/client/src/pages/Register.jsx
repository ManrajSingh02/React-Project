import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMessage("All fields required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      if (!data.token) {
        setMessage("Registration failed: no token received");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {message && (
          <p className="text-red-400 text-sm text-center mb-4">{message}</p>
        )}

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-6 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </Layout>
  );
}
