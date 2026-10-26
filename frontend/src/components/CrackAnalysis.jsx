import React, { useState } from 'react';
import { 
  SearchCheck, 
  UploadCloud, 
  AlertCircle, 
  CheckCircle2, 
  Wrench, 
  Sparkles, 
  Printer,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { analyzeCrack } from '../services/api';

export default function CrackAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleLoadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, 600, 400);
    // Draw synthetic concrete texture & crack
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(240, 180);
    ctx.lineTo(310, 220);
    ctx.lineTo(480, 360);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '20px monospace';
    ctx.fillText('CONCRETE COLUMN CRACK PATTERN SAMPLE', 50, 40);

    canvas.toBlob((blob) => {
      const sampleFile = new File([blob], 'sample_concrete_crack.jpg', { type: 'image/jpeg' });
      setFile(sampleFile);
      setPreview(URL.createObjectURL(sampleFile));
      setContext('Diagonal fissure noticed on ground floor load-bearing RC shear wall.');
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select or load a crack photo for analysis.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('structural_context', context);
      const data = await analyzeCrack(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Crack analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-red-600 mb-1">
            <SearchCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Forensic Engineering AI</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Structural Crack Detection & Analysis</h2>
          <p className="text-xs text-slate-500 mt-1">
            Image-based forensic diagnostics to evaluate concrete fissures, settlement fractures, and structural failure hazards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>Load Sample Crack Image</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Concrete / Masonry Photo
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-red-500 transition-colors bg-slate-50 relative min-h-[190px] flex flex-col justify-center items-center">
              {preview ? (
                <div className="space-y-2">
                  <img src={preview} alt="Crack Preview" className="max-h-40 mx-auto rounded-lg object-contain shadow-xs" />
                  <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs">{file?.name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-medium">Upload high-resolution close-up of crack</p>
                  <p className="text-[10px] text-slate-400">Include a coin or scale ruler if possible for precision</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Structural Member & Location Details
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="E.g., North exterior basement retaining wall, 45-degree diagonal pattern near foundation beam..."
                rows={4}
                className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>{loading ? 'Performing Forensic Diagnostic...' : 'Analyze Structural Crack'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}
      </form>

      {/* Analysis Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Key Metric Cards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Assessment #{result.id}</span>
              <h3 className="text-sm font-semibold text-slate-700">{result.crack_type}</h3>
              <p className="text-xs text-slate-500">{result.timestamp}</p>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Severity Score</span>
              <div className="text-3xl font-extrabold text-red-600 mt-1">{result.severity_score}/100</div>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Estimated Width</span>
              <div className="text-2xl font-extrabold text-slate-800 mt-1">{result.estimated_width_mm} mm</div>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Engineer Required</span>
              <div className="mt-1">
                {result.engineer_inspection_required ? (
                  <span className="inline-block px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-red-100 text-red-800 border border-red-300">
                    MANDATORY
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Routine Maintenance
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Structural Integrity Risk Assessment */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Structural Integrity Risk Statement</span>
            </h3>
            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 text-xs text-slate-800 leading-relaxed font-medium">
              {result.structural_integrity_risk}
            </div>
          </div>

          {/* Causes & Immediate Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Probable Engineering Causes</h4>
              <ul className="space-y-2">
                {result.probable_causes?.map((cause, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Immediate Site Actions</h4>
              <ul className="space-y-2">
                {result.immediate_actions?.map((act, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Repair Methodology */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Technical Remediation & Repair Methodology</span>
            </h3>
            <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              {result.recommended_repair_method}
            </p>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Required Construction Materials & Specifications
              </h5>
              <div className="flex flex-wrap gap-2">
                {result.materials_required?.map((mat, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 font-medium border border-blue-200">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Diagnostic Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
