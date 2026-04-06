import { Outlet } from "react-router";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
     <Footer />
    </div>
  );
}

export default Layout;
