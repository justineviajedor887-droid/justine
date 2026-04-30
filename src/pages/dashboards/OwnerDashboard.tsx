/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { listingService, Listing } from '../../services/listingService';
import ListingCard from '../../components/ListingCard';
import { Building2, Plus, List, Home, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const OwnerDashboard = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchMyListings = async () => {
        try {
          const data = await listingService.getOwnerListings(user.uid);
          setListings(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchMyListings();
    }
  }, [user]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Owner Dashboard</h1>
            <p className="text-slate-500 mt-3 text-sm font-medium">Coordinate your properties and monitor incoming traffic.</p>
          </div>
          <Link 
            to="/listings/new" 
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all shadow-sm"
          >
            <Plus size={16} strokeWidth={3} />
            Post New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {[
             { label: 'Properties', value: listings.length, icon: Building2 },
             { label: 'Inquiries', value: 24, icon: MessageSquare },
             { label: 'Visits', value: '1.2k', icon: TrendingUp },
             { label: 'Tenants', value: 8, icon: Users }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
             >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 transition-colors">
                    <stat.icon size={18} />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-display font-medium text-slate-900">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
             <List className="text-slate-400" size={16} />
             <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Inventory</h2>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-20 text-center shadow-sm">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-8">
                <Building2 size={32} />
             </div>
             <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Portfolio is Empty</h3>
             <p className="text-slate-500 mb-10 max-w-sm mx-auto text-sm font-medium leading-relaxed">Begin your journey by listing your properties in the Metro Cebu area.</p>
             <Link 
              to="/listings/new" 
              className="inline-flex items-center gap-2 px-10 py-3.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              Start Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
