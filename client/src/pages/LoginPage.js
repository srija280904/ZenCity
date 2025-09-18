import React from 'react';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Smart City Dashboard Login</h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;