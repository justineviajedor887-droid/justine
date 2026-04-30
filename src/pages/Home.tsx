/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Map as MapIcon, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { listingService, Listing } from '../services/listingService';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getAllListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="space-y-24 pb-32">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Rent Better. <span className="text-blue-600">Simpler.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium">
              We've redesigned the property search experience from the ground up for the modern tenant in Cebu.
            </p>

            <div className="relative w-full max-w-xl group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-14 pr-32 h-16 border border-slate-200 rounded-full text-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all shadow-sm"
                placeholder="Search neighborhood or street..."
              />
              <button className="absolute right-2 top-2 bottom-2 px-8 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Editor's Choice</h2>
            <h3 className="text-3xl font-display font-bold text-slate-900">Featured Homes</h3>
          </div>
          <Link to="/map" className="text-sm font-bold text-blue-600 hover:underline underline-offset-4">
            View Map
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-slate-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
             <MapIcon className="mx-auto text-slate-300 mb-4" size={40} />
             <p className="text-slate-500 font-medium text-lg">No listings available in this area.</p>
          </div>
        )}
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-t border-slate-100 pt-24">
         <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600">
               <ShieldCheck size={24} />
            </div>
            <h4 className="text-xl font-bold">Verified Only</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Every property is manually checked for authenticity and ownership records.</p>
         </div>
         <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600">
               <Zap size={24} />
            </div>
            <h4 className="text-xl font-bold">Direct Response</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">Message owners directly through our encrypted platform and get replies faster.</p>
         </div>
         <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600">
               <Globe size={24} />
            </div>
            <h4 className="text-xl font-bold">Transparent Pricing</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">What you see is what you pay. No hidden fees or agent commissions on top.</p>
         </div>
      </section>
    </div>
  );
};

export default Home;
