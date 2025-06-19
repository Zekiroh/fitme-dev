import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance'; 
import CustomerAssistance from './pages/CustomerAssistance';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance />} /> 
      <Route path="/assistance" element={<CustomerAssistance />} /> 
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;