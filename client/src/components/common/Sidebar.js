import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">SmartCity</div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700">Dashboard</Link>
        <Link to="/reports" className="block px-4 py-2 rounded hover:bg-gray-700">Reports</Link>
        {/* Add more links as needed */}
      </nav>
    </div>
  );
};

export default Sidebar;