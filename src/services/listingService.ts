/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Listing {
  id?: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
  status: 'available' | 'rented' | 'pending';
  createdAt?: any;
}

export const listingService = {
  async getAllListings() {
    const q = query(collection(db, 'listings'), where('status', '==', 'available'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
  },

  async getListingById(id: string) {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Listing;
    }
    return null;
  },

  async createListing(listing: Omit<Listing, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'listings'), {
      ...listing,
      createdAt: serverTimestamp()
    });
  },

  async getOwnerListings(ownerId: string) {
    const q = query(collection(db, 'listings'), where('ownerId', '==', ownerId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
  }
};
