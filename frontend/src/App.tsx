import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Devices from './pages/Devices';
import DeviceDetails from './pages/DeviceDetails';
import CreateDeviceForm from './components/CreateDeviceForm';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { getToken } from './services/keycloak';

const App: React.FC = () => {
  const currentLocation = useLocation();
  const isLoggedIn = !!getToken();

  return (
    <div>
      {isLoggedIn && currentLocation.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/devices" element={<PrivateRoute><Devices /></PrivateRoute>} />
        <Route path="/devices/new" element={<PrivateRoute><CreateDeviceForm /></PrivateRoute>} />
        <Route path="/devices/:id" element={<PrivateRoute><DeviceDetails /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default App;
