import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ NEW

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      setSuccess("User added successfully!");

      setUsers((prev) => [{ id: Date.now(), ...form }, ...prev]);

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      setUsers(data.reverse());
    } catch (err) {
      console.error(err);
      setError("Unable to load users");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {success && (
          <p className="text-green-600 mt-3 text-center">{success}</p>
        )}

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>

      <div className="w-full max-w-2xl mt-6 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Submitted Users</h2>

        {fetchLoading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No data found</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li key={user.id} className="border p-3 rounded bg-gray-50">
                <p className="font-medium">Name: {user.name}</p>
                <p className="font-medium">Email: {user.email}</p>
                <p className="font-medium">Message: {user.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
