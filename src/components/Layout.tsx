/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './Navbar';
import { User } from 'firebase/auth';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  role: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, user, role }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} role={role} />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} KabaFind. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
