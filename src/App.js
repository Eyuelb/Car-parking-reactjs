import React, { useEffect, useState } from "react";
//import Usuarios from "./pages/Usuarios.js";
import Carros from "./pages/Carros.js";
import Index from "./pages/inicio.js";
import Login from "./pages/Login.js";
import Logout from "./utils/Logout.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token && window.location.pathname !== "/login" && window.location.pathname !== "/user/authenticate") {
      window.location.href = "/login";
    }
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          {/* <Route path="/usuarios" element={<Usuarios />} /> */}
          <Route path="/carros" element={<Carros />} />
          <Route path="/sair" element={<Logout />} />
        </Routes>
      </Router>
  );
}

export default App;
