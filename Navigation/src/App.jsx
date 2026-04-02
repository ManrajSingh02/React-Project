import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import AboutUs from "./AboutUs.jsx";
import ContactUs from "./ContactUs.jsx";
import User from "./User.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />

          <Route path="/user/:id" element={<User />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
