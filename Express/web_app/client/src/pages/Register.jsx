import { useState } from "react";
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
        setMessage(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      setMessage("Registered successfully!");
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Layout/>
     <form
  onSubmit={handleSubmit}
  className="backdrop-blur-xl bg-white/10 border border-white/20 
             shadow-2xl rounded-2xl p-8 w-full max-w-md "
>
  <h2 className="text-3xl font-semibold text-center mb-6">
    Create Account
  </h2>

  <input
    placeholder="Name"
    className="w-full p-3 mb-4 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
  />

  <input
    placeholder="Email"
    className="w-full p-3 mb-4 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="password"
    placeholder="Password"
    className="w-full p-3 mb-6 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
  />

  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
    Register
  </button>
</form>
    </div>
  );
}