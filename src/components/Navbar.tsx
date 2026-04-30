/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Home, Map as MapIcon, User as UserIcon, LogOut, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  user: User | null;
  role: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ user, role }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-blue-600 flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg mr-2 flex items-center justify-center translate-y-[-1px]">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          kabafind
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
           <Link to="/" className="hover:text-slate-900">Discover</Link>
           <Link to="/map" className="hover:text-slate-900">Map View</Link>
           {user && (role === 'owner' || role === 'admin') && (
             <Link to="/listings/new" className="hover:text-slate-900">List Property</Link>
           )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <Link 
              to={`/dashboard/${role}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 hover:bg-slate-50 rounded-lg flex items-center gap-2"
              id="dashboard-link"
            >
              <UserIcon size={16} />
              <span className="capitalize">{role} Dashboard</span>
            </Link>
            <div className="w-px h-4 bg-slate-200"></div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
              id="logout-button"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
