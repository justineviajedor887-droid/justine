/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bath, Bed, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { Listing } from '../services/listingService';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden p-3 border border-transparent hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 transition-all"
    >
      <Link to={`/listings/${listing.id}`}>
        <div className="aspect-video bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
          <img 
            src={listing.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'} 
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-600 border border-white/50">
            {listing.status === 'available' ? 'Newly Listed' : listing.status}
          </div>
        </div>
      </Link>

      <div className="px-1 pb-2">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/listings/${listing.id}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </Link>
          <span className="text-blue-600 font-bold shrink-0">
            ${listing.price.toLocaleString()}<span className="text-slate-400 font-normal text-xs">/mo</span>
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4 line-clamp-1 mt-1">{listing.address}</p>
        
        <div className="flex space-x-4 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Bed size={12} className="opacity-60" />
            3 Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={12} className="opacity-60" />
            2 Bath
          </span>
          <span className="flex items-center gap-1">
            <Square size={12} className="opacity-60" />
            1,200 sqft
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
