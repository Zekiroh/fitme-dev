import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance'; // ✅ import
import AttendanceForm from './pages/AttendanceForm';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance />} /> {/* ✅ add this safely */}
      <Route path="/attendance-form" element={<AttendanceForm />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
