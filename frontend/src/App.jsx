import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Ticket from "./pages/Ticket.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
