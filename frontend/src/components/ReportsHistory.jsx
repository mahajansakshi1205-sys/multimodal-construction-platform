import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  Eye, 
  Download, 
  ShieldAlert, 
  SearchCheck, 
  Building2, 
  CalendarClock, 
  CloudSun,
  X,
  FileCode,
  Printer
} from 'lucide-react';
import { getReports, deleteReport } from '../services/api';

export default function ReportsHistory() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeModalReport, setActiveModalReport] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getReports(filter || null);
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete audit record #${id}?`)) return;
    try {
      await deleteReport(id);
      setReports(prev => prev.filter(r => r.id !== id));
      if (activeModalReport?.id === id) {
        setActiveModalReport(null);
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const getModuleIcon = (mod) => {
    switch (mod) {
      case 'safety': return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'crack': return <SearchCheck className="w-4 h-4 text-red-600" />;
      case 'valuation': return <Building2 className="w-4 h-4 text-emerald-600" />;
      case 'planning': return <CalendarClock className="w-4 h-4 text-blue-600" />;
      case 'advisory': return <CloudSun className="w-4 h-4 text-sky-600" />;
      default: return <History className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-slate-500 mb-1">
            <History className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Audit Trail & Data Store</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Inspection & Decision Records</h2>
          <p className="text-xs text-slate-500 mt-1">
            Persistent SQLite audit repository containing all multimodal outputs, data contracts, and forensic logs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['', 'safety', 'crack', 'valuation', 'planning', 'advisory'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                filter === f 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f || 'All Modules'}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading audit records...</div>
        ) : reports.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <History className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No inspection records found</p>
            <p className="text-xs text-slate-400">Run an analysis in Safety, Crack Detection, Valuation, or Planning to generate records.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reports.map((r) => (
              <div key={r.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 shrink-0">
                    {getModuleIcon(r.module_type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">{r.title}</span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {r.module_type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-lg">{r.summary}</p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Recorded: {new Date(r.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveModalReport(r)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200 text-xs flex items-center space-x-1"
                    title="View Data Contract Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* JSON Contract / Detail Modal */}
      {activeModalReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2.5">
                <FileCode className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-bold text-sm text-slate-800">{activeModalReport.title}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Record ID #{activeModalReport.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalReport(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {activeModalReport.image_path && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Attached Inspection Visual
                  </span>
                  <img 
                    src={activeModalReport.image_path} 
                    alt="Audit Visual" 
                    className="max-h-48 rounded-xl object-contain border border-slate-200 shadow-xs" 
                  />
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Summary
                </span>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {activeModalReport.summary}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Strict JSON Data Contract Payload
                </span>
                <pre className="text-[11px] font-mono bg-slate-900 text-emerald-400 p-4 rounded-xl overflow-x-auto max-h-60 border border-slate-800">
                  {JSON.stringify(activeModalReport.data, null, 2)}
                </pre>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 hover:bg-slate-100 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Record</span>
              </button>

              <button
                onClick={() => setActiveModalReport(null)}
                className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
