import { NavLink } from "react-router";

function Navbar() {
  const baseStyle =
    "h-15 bg-blue-400 p-4 flex justify-center gap-6 shadow-md rounded-2xl";
  const activeStyle =
    "bg-blue-400 p-4 flex justify-center gap-6 shadow-md rounded-2xl";
  const inactiveStyle =
    "bg-blue-400 p-4 flex justify-center gap-6 shadow-md rounded-2xl";

  return (
    <nav className="h-30 bg-linear-to-r from-blue-200 to-teal-300 p-4 flex justify-center gap-6 shadow-md rounded-2xl ">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about-us"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        About Us
      </NavLink>

      <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        Contact Us
      </NavLink>
    </nav>
  );
}

export default Navbar;
