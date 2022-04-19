import './App.css';
import Login from './screen/Login';
import Dashboard from './screen/Dashboard';
import { Route, Routes } from 'react-router-dom';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
