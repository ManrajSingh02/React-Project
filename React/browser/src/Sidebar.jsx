import { NavLink } from "react-router";

function Sidebar() {
  const baseStyle =
    "px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-medium";

  const activeStyle = "text-white hover:bg-blue-500";
  const inactiveStyle = "text-white hover:bg-blue-500";

  return (
    <div className="h-[75vh] w-2xs bg-gradient-to-r from-blue-300 to-teal-300 p-5 flex flex-col gap-4 shadow-xl rounded-2xl">
      <h2 className="text-white text-xl font-bold mb-6 text-center">
        User Details
      </h2>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        User Id
      </NavLink>

      <NavLink
        to="/user-name"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        User Name
      </NavLink>

      <NavLink
        to="/department"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        Department
      </NavLink>
    </div>
  );
}

export default Sidebar;
