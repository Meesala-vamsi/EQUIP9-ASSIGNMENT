import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';
import ProtectedRoute from './components/protectedRoute';
import AuthLayout from './components/authLayout';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/slices/authSlice.js';
import DashboardLayout from './pages/dashboardLayout/index.jsx';
import Home from './pages/Home/index.jsx';

const App = () => {
  const { isAuthenticated, userData, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bottom-1/2 flex items-center justify-center min-h-screen">
        <div className="loader border-t-transparent border-4 border-gray-400 rounded-full w-9 h-9 animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}></ProtectedRoute>
          }
        />
        <Route
          path="auth/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userData={userData}>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App