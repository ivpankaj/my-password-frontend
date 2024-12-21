import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PasswordManager from './components/PasswordManager';
import Login from './pages/Login';

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      
      {/* Private Route */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <PasswordManager />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
