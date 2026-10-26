import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  SearchCheck, 
  Building2, 
  CalendarClock, 
  CloudSun, 
  MessagesSquare, 
  History,
  HardHat,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'safety', label: 'Safety Monitoring', icon: ShieldAlert, badge: 'Vision AI' },
    { id: 'cracks', label: 'Crack Analysis', icon: SearchCheck, badge: 'Forensic' },
    { id: 'valuation', label: 'Real Estate Valuation', icon: Building2 },
    { id: 'planning', label: 'Project Planning & WBS', icon: CalendarClock },
    { id: 'advisory', label: 'Daily Advisory & Weather', icon: CloudSun },
    { id: 'knowledge', label: 'Knowledge Assistant', icon: MessagesSquare },
    { id: 'history', label: 'Audit Records', icon: History },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center space-x-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-white font-bold shadow-inner">
          <HardHat className="w-6 h-6 text-amber-300" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight leading-none text-white">SKILL WALLET</h1>
          <p className="text-xs text-blue-200 tracking-wide mt-1 font-medium">Construction Intelligence</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-3 flex-1 overflow-y-auto space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Core Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600 pl-3'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Architecture Spec Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Data Contract</span>
            <span className="text-emerald-600 font-mono text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Strict JSON</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            FastAPI ⇄ React ⇄ Gemini Multimodal
          </p>
        </div>
      </div>
    </aside>
  );
}
