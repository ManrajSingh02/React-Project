import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
