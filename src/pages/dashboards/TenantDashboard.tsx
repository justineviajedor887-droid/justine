/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { listingService, Listing } from '../../services/listingService';
import ListingCard from '../../components/ListingCard';
import { Bookmark, MessageSquare, Clock, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const TenantDashboard = () => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    // In a real app, you'd fetch saved properties from a junction collection
    // For this prototype, we'll just show some recent public listings as "Recommended"
    const fetchContent = async () => {
      try {
        const publicListings = await listingService.getAllListings();
        setSavedListings(publicListings.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [user]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Howdy, {user?.displayName?.split(' ')[0] || 'Tenant'}!</h1>
          <p className="text-slate-500 mt-3 text-sm font-medium">Coordinate your home search and explore Cebu's best spots.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* Recent Inquiries */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-slate-400" size={16} />
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inquiries</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                 <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                    <Clock size={20} />
                 </div>
                 <p className="text-slate-500 font-medium tracking-tight text-sm">No active inquiries found.</p>
                 <Link to="/" className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-4 inline-block hover:underline">Browse Neighborhoods</Link>
              </div>
            </section>

            {/* Recommended for you */}
            <section>
              <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <Bookmark className="text-slate-400" size={16} />
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recommendations</h2>
                </div>
                <Link to="/map" className="text-blue-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:underline">
                   View Map
                   <Search size={12} strokeWidth={3} />
                </Link>
              </div>
              {loading ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-64 bg-white rounded-xl border border-slate-100 animate-pulse"></div>
                  <div className="h-64 bg-white rounded-xl border border-slate-100 animate-pulse"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-10">
                  {savedListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
               <h3 className="text-lg font-display font-medium mb-3">Map Explorer</h3>
               <p className="text-slate-400 text-xs mb-8 leading-relaxed font-medium">Discover hidden gems in the Metro by geographical proximity and budget.</p>
               <Link to="/map" className="w-full py-3 bg-white text-slate-900 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-widest hover:bg-slate-100">
                  <MapPin size={14} />
                  Explore Cebu
               </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">User Profile</h3>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center font-bold text-xs">
                     {user?.displayName?.charAt(0) || 'U'}
                  </div>
                  <div>
                     <p className="text-sm font-bold text-slate-900 line-clamp-1 leading-none">{user?.displayName || 'User'}</p>
                     <p className="text-[10px] text-slate-400 font-medium mt-1.5">{user?.email}</p>
                  </div>
               </div>
               <button className="w-full py-2.5 border border-slate-200 text-slate-400 font-bold rounded-full text-[10px] uppercase tracking-widest opacity-50 cursor-not-allowed">
                  Settings
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
