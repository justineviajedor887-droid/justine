/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Compass, Grid, List } from 'lucide-react';
import { listingService, Listing } from '../services/listingService';
import ListingCard from '../components/ListingCard';
import { motion, AnimatePresence } from 'motion/react';

const MapPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'map' | 'list'>('map');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getAllListings();
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Header Search / Filter Bar */}
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center space-x-6 flex-grow max-w-4xl">
           <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 font-bold" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full text-sm bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium" 
                placeholder="Search neighborhood..." 
              />
           </div>
           <button className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
             <Filter size={14} />
             Filters
           </button>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-slate-100 p-1 rounded-xl flex items-center shrink-0 border border-slate-200">
                <button 
                  onClick={() => setViewType('map')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewType === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Compass size={14} />
                  MAP
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewType === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  <List size={14} />
                  LIST
                </button>
           </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Results List */}
        {viewType === 'map' && (
          <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 hidden lg:flex">
             <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{listings.length} Results</h2>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {listings.map(listing => (
                  <div 
                    key={listing.id}
                    onClick={() => setSelectedListing(listing)}
                    className="group cursor-pointer border-b border-slate-50 pb-6 last:border-0"
                  >
                    <div className="aspect-video bg-slate-200 rounded-xl mb-3 overflow-hidden">
                       <img src={listing.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex justify-between items-start gap-2">
                       <h3 className={`font-bold transition-colors line-clamp-1 ${selectedListing?.id === listing.id ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{listing.title}</h3>
                       <span className="text-blue-600 font-bold shrink-0">${listing.price/1000}k</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">{listing.address.split(',')[0]}</p>
                  </div>
                ))}
             </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 relative bg-slate-200 overflow-y-auto ${viewType === 'list' ? 'p-10' : ''}`}>
           {viewType === 'map' ? (
             <div className="absolute inset-0">
                {/* Map Grid Effect */}
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)", backgroundSize: "30px 30px" }}></div>
                
                {/* Pins */}
                {listings.map((listing, i) => (
                  <div 
                    key={listing.id}
                    className="absolute"
                    style={{ 
                      left: `${30 + (i % 2 === 0 ? i * 8 : -i * 6)}%`, 
                      top: `${25 + (i % 3 === 0 ? i * 10 : -i * 5)}%` 
                    }}
                  >
                    <div 
                      onClick={() => setSelectedListing(listing)}
                      className={`px-3 py-1.5 rounded-full shadow-xl flex items-center font-bold text-sm transform transition-all cursor-pointer hover:scale-110 ${selectedListing?.id === listing.id ? 'bg-blue-600 text-white z-50' : 'bg-white text-blue-600 border border-slate-200 z-10'}`}
                    >
                      ${listing.price.toLocaleString()}
                      {/* Triangle Pointer */}
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 ${selectedListing?.id === listing.id ? 'bg-blue-600' : 'bg-white border-r border-b border-slate-200'}`}></div>
                    </div>
                  </div>
                ))}

                {/* Mobile/Small Screen Overlay */}
                <AnimatePresence>
                  {selectedListing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm lg:hidden z-30"
                    >
                       <div className="relative">
                          <button 
                            onClick={() => setSelectedListing(null)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-40"
                          >
                            <X size={14} />
                          </button>
                          <ListingCard listing={selectedListing} />
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ) : (
             <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
               {listings.map(l => <ListingCard key={l.id} listing={l} />)}
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default MapPage;
