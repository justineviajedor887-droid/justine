/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { listingService } from '../../services/listingService';
import { Building2, X, PlusCircle, MapPin, DollarSign, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const NewListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await listingService.createListing({
        ownerId: user.uid,
        title,
        description,
        price: parseFloat(price),
        address,
        location: { lat: 10.3157, lng: 123.8854 }, // Fixed Cebu city lat/lng for demo
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'],
        status: 'available'
      });
      navigate('/dashboard/owner');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16 text-center">
           <h1 className="text-4xl font-display font-medium text-slate-900 tracking-tight">Post Your Property</h1>
           <p className="text-slate-500 mt-4 text-sm font-medium">Add your listing to Cecil's most refined property catalogue.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-16">
            <section className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-10">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Basic Information</h3>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Property Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full px-6 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="e.g. Modern Studio at IT Park"
                  id="listing-title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Detailed Description</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all min-h-[160px]"
                  placeholder="Describe your property (amenities, location highlights, etc.)"
                  id="listing-description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Monthly Rate ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input 
                      type="number" 
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="block w-full pl-12 pr-6 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                      placeholder="25,000"
                      id="listing-price"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="block w-full pl-12 pr-6 h-12 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                      placeholder="e.g. Salinas Drive, Lahug, Cebu City"
                      id="listing-address"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-10">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Imagery</h3>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-100 transition-colors">
                    <PlusCircle size={20} className="mb-2" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Select Image</span>
                 </div>
                 {[1, 2, 3].map(i => (
                   <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 border-dashed"></div>
                 ))}
              </div>
            </section>

            <div className="pt-10">
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full h-12 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
                 id="publish-listing-button"
               >
                  {loading ? 'Processing' : 'Publish Property'}
               </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NewListing;
