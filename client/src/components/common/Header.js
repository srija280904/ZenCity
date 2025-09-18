import React from 'react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { auth, logout } = useAuth();
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <h1 className="text-xl">Welcome, {auth.user?.role || 'User'}!</h1>
      <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
    </header>
  );
};
export default Header;