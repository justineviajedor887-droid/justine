/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-slate-50 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold text-slate-900">Sign In</h1>
          <p className="text-slate-500 mt-3 text-sm font-medium tracking-tight">Enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="email@example.com"
                id="login-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mx-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
              <Link to="#" className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="••••••••"
                id="login-password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-slate-900 text-white font-bold rounded-full hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-4 text-sm uppercase tracking-widest"
            id="login-submit"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-xs font-medium">
            Don't have an account yet? <Link to="/register" className="text-blue-600 font-bold hover:underline ml-1">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
