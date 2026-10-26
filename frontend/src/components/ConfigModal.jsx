import React, { useState } from 'react';
import { X, Key, Check, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';
import { updateApiKey } from '../services/api';

export default function ConfigModal({ isOpen, onClose, configStatus, onRefreshStatus }) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await updateApiKey(apiKey.trim());
      setMessage({ type: 'success', text: res.message || 'API key updated!' });
      onRefreshStatus();
      setApiKey('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update API key' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Intelligence Layer Configuration</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Current Engine: {configStatus?.gemini_configured ? 'Google Gemini Live API' : 'Adaptive Intelligence Fallback Engine'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                The platform functions without disruption using built-in forensic and structural engineering logic. Adding your Google Gemini API key enables real-time vision token analysis.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Gemini API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2.5 pl-10 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Obtain a key at <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">aistudio.google.com</a>. Stored in memory for runtime sessions.
              </p>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-xs font-medium flex items-center space-x-2 ${
                message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.type === 'success' ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
                <span>{message.text}</span>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading || !apiKey.trim()}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-xs"
              >
                {loading ? 'Validating...' : 'Save & Activate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
