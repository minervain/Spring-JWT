import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
          <li>
              <Link to="/">asd</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
