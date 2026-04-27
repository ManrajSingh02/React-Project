import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:4004/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
        
      }

      setUser(data.user);
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message || "Not authorized");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Dashboard
        </h2>

        {user ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.name}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.email}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-red-500 font-medium">{message}</p>
        )}

      </div>
    </div>
  );
}