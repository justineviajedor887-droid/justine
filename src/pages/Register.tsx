/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserPlus, Mail, Lock, User, AlertCircle, Building2, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'tenant' | 'owner'>('tenant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Save user role in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        role,
        createdAt: serverTimestamp()
      });

      navigate(`/dashboard/${role}`);
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20 bg-slate-50 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-3 text-sm font-medium tracking-tight">Join Cebu's most refined property network.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-10">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 scale-95 origin-center">
             <button
               type="button"
               onClick={() => setRole('tenant')}
               className={`p-5 rounded-2xl border transition-all text-left flex flex-col gap-3 relative ${role === 'tenant' ? 'border-slate-900 bg-slate-900 text-white shadow-xl translate-y-[-4px]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
             >
                <UserCircle size={20} className={role === 'tenant' ? 'text-white' : 'text-slate-400'} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest leading-none">Tenant</h4>
                  <p className={`text-[10px] mt-1 font-medium ${role === 'tenant' ? 'text-slate-300' : 'text-slate-400'}`}>Finding a home</p>
                </div>
                {role === 'tenant' && <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>}
             </button>
             <button
               type="button"
               onClick={() => setRole('owner')}
               className={`p-5 rounded-2xl border transition-all text-left flex flex-col gap-3 relative ${role === 'owner' ? 'border-slate-900 bg-slate-900 text-white shadow-xl translate-y-[-4px]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
             >
                <Building2 size={20} className={role === 'owner' ? 'text-white' : 'text-slate-400'} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest leading-none">Owner</h4>
                  <p className={`text-[10px] mt-1 font-medium ${role === 'owner' ? 'text-slate-300' : 'text-slate-400'}`}>Managing assets</p>
                </div>
                {role === 'owner' && <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>}
             </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text" 
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="block w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="Juan Dela Cruz"
                  id="register-name"
                />
              </div>
            </div>

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
                  id="register-email"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Minimum 6 characters"
                id="register-password"
                minLength={6}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-slate-900 text-white font-bold rounded-full hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-4 text-sm uppercase tracking-widest"
            id="register-submit"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-xs font-medium">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
