import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/user/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
            navigate("/");
            return;
          }

          throw new Error(data.message);
        }

        setUser(data.user);
      } catch (err) {
        setMessage(err.message || "Not authorized");
      }
    };

    fetchDashboard();
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 
                      shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">

        <h2 className="text-3xl font-semibold mb-6">
          Dashboard
        </h2>

        {!user ? (
          <p className="text-red-400">{message || "Loading..."}</p>
        ) : (
          <>
            <div className="bg-white/10 p-4 rounded-lg mb-4">
              <p className="text-gray-300 text-sm">Name</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg mb-6">
              <p className="text-gray-300 text-sm">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
