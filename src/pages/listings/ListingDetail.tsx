/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listingService, Listing } from '../../services/listingService';
import { auth, db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MapPin, Bath, Bed, Square, MessageSquare, ShieldCheck, Share2, Heart, ArrowLeft, Send, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [inquiryText, setInquiryText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          const data = await listingService.getListingById(id);
          setListing(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchListing();
    }
  }, [id]);

  const handleSendInquiry = async () => {
    if (!user || !listing || !inquiryText.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        listingId: listing.id,
        tenantId: user.uid,
        ownerId: listing.ownerId,
        message: inquiryText,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSent(true);
      setInquiryText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-display text-2xl text-gray-300">Loading fine details...</div>;
  if (!listing) return <div className="p-20 text-center">Listing not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
            <ArrowLeft size={14} />
            Gallery
          </Link>
          <div className="flex gap-4">
             <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <Share2 size={18} />
             </button>
             <button className="text-slate-400 hover:text-red-500 transition-colors">
                <Heart size={18} />
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery Section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img 
                  src={listing.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200'} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-10 md:p-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                   <div className="flex-1">
                     <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Property Detail</p>
                     <h1 className="text-4xl font-display font-medium text-slate-900 mb-6 leading-tight">{listing.title}</h1>
                     <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                       <MapPin size={16} className="text-slate-300" />
                       {listing.address}
                     </div>
                   </div>
                   <div className="shrink-0 text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monthly rate</p>
                      <p className="text-4xl font-display font-medium text-slate-900">${listing.price.toLocaleString()}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-y border-slate-100 mb-12">
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Space</p>
                      <div className="flex items-center gap-3 text-slate-900 font-medium">
                         <Bed size={16} className="text-slate-300" />
                         <span className="text-sm">3 Units</span>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Comfort</p>
                      <div className="flex items-center gap-3 text-slate-900 font-medium">
                         <Bath size={16} className="text-slate-300" />
                         <span className="text-sm">2 Units</span>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Sizing</p>
                      <div className="flex items-center gap-3 text-slate-900 font-medium">
                         <Square size={16} className="text-slate-300" />
                         <span className="text-sm">1,450 sf</span>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Assurance</p>
                      <div className="flex items-center gap-3 text-slate-900 font-bold italic">
                         <ShieldCheck size={16} className="text-blue-500" />
                         <span className="text-xs uppercase tracking-tight text-blue-500">Verified</span>
                      </div>
                   </div>
                </div>

                <div className="prose prose-slate max-w-none">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-8">Description</h3>
                  <div className="text-slate-500 leading-relaxed space-y-6 font-medium">
                     <p>{listing.description}</p>
                     <p>Nestled in a prime corridor of Metro Cebu, this property exemplifies contemporary urban living. Its architectural clarity and functional layout cater to a refined lifestyle, offering both seclusion and accessibility to the city's key hubs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Inquiry */}
          <aside className="space-y-8">
             <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm sticky top-24">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-8">Inquire</h3>
                
                {user ? (
                  sent ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 bg-slate-50 border border-slate-100 rounded-2xl text-center"
                    >
                       <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                          <Send size={16} />
                       </div>
                       <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">Message Sent</h4>
                       <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">The coordinator will review your inquiry shortly.</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                       <textarea 
                          className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 focus:bg-white focus:border-slate-900 outline-none min-h-[160px] transition-all text-xs font-medium placeholder-slate-300"
                          placeholder="Your message regarding this property..."
                          value={inquiryText}
                          onChange={(e) => setInquiryText(e.target.value)}
                          id="inquiry-message"
                       />
                       <button 
                         onClick={handleSendInquiry}
                         disabled={sending || !inquiryText.trim()}
                         className="w-full py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                         id="send-inquiry-button"
                       >
                          {sending ? 'Sending' : 'Send Message'}
                       </button>
                    </div>
                  )
                ) : (
                  <div className="p-8 bg-slate-50 rounded-2xl text-center space-y-6">
                     <p className="text-slate-500 font-medium text-xs leading-relaxed">Identity verification is required to initiate contact with the coordinator.</p>
                     <Link 
                       to="/login" 
                       className="block w-full py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-sm"
                     >
                       Login to Inquire
                     </Link>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-slate-100">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                          <Building2 size={16} />
                      </div>
                      <div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ownership</p>
                         <p className="text-xs font-bold text-slate-900">Verified Partner</p>
                      </div>
                   </div>
                   <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Established coordinator with a consistent record of tenant satisfaction since 2024.</p>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
