import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

 
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold border-b-2 border-black pb-1"
      : "text-gray-600 hover:text-black";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>

      <div className="flex items-center space-x-5">
        
        <NavLink to="/" className={linkClass}>
          Login
        </NavLink>

        <NavLink to="/register" className={linkClass}>
          Register
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}