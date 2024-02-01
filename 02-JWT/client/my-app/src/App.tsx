// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dasboard from './Pages/Dasboard';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
