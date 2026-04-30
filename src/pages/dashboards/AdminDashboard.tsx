/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Users, Building, AlertTriangle, Settings, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-6 mb-16 border-b border-slate-200 pb-10">
           <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Shield size={20} />
           </div>
           <div>
             <h1 className="text-3xl font-display font-medium text-slate-900 tracking-tight leading-none">Control Center</h1>
             <p className="text-slate-400 mt-2 uppercase text-[10px] font-bold tracking-[0.2em]">Administrative Interface</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { name: 'Accounts', desc: 'Monitor active user base and permissions', icon: Users },
             { name: 'Verification', desc: 'Approve or flag property submissions', icon: Building },
             { name: 'Security', desc: 'Audit logs and system threat assessments', icon: AlertTriangle },
             { name: 'Intelligence', desc: 'Platform growth and transaction metrics', icon: BarChart3 },
             { name: 'Configuration', desc: 'Global settings and deployment parameters', icon: Settings }
           ].map((tool, i) => (
             <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center mb-6 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                   <tool.icon size={18} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">{tool.name}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{tool.desc}</p>
             </div>
           ))}
        </div>

        <div className="mt-20 p-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
           <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-10 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             System Vitality
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                 <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-4">Server Load</p>
                 <div className="flex items-center gap-3">
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-slate-900 w-[12%]"></div>
                    </div>
                    <span className="font-bold text-xs text-slate-900">12%</span>
                 </div>
              </div>
              <div>
                 <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-4">Queries</p>
                 <div className="text-xl font-display font-medium text-slate-900">42/s</div>
              </div>
              <div>
                 <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-4">Auth</p>
                 <div className="text-xl font-display font-medium text-slate-900">Healthy</div>
              </div>
              <div>
                 <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-4">Latency</p>
                 <div className="text-xl font-display font-medium text-green-600">18ms</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
