import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-200 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User List
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">
            Loading users...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 font-medium">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition shadow-sm"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
