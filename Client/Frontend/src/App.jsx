import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataTable from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contacts" element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;
