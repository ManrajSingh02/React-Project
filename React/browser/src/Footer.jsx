import { NavLink } from "react-router";

export default function Footer() {
  const linkStyle = "transition hover:text-yellow-400";

  const activeStyle = "text-yellow-400 font-semibold";

  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto rounded-2xl h-15">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
         CopyRight! ©  MyApp. All rights reserved.
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
