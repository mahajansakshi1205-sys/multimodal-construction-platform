import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UploadCloud, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HardHat, 
  Users, 
  FileText,
  Printer,
  Sparkles
} from 'lucide-react';
import { analyzeSafety } from '../services/api';

export default function SafetyMonitoring() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notes, setNotes] = useState('');
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

  const handleLoadSample = async () => {
    // Generate a simple synthetic canvas sample image
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(50, 150, 500, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px sans-serif';
    ctx.fillText('CONSTRUCTION SITE SAFETY AUDIT ZONE 4', 60, 100);
    ctx.fillText('Workers Active: Scaffolding Deck Level 2', 60, 240);
    
    canvas.toBlob((blob) => {
      const sampleFile = new File([blob], 'sample_site_safety.jpg', { type: 'image/jpeg' });
      setFile(sampleFile);
      setPreview(URL.createObjectURL(sampleFile));
      setNotes('Automated audit of zone 4 scaffolding and ground workers.');
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select or load an image for inspection.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('notes', notes);
      const data = await analyzeSafety(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Safety inspection failed.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'moderate': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'severe': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 mb-1">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Vision Intelligence</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Construction Site Safety Monitoring</h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated PPE compliance verification and real-time hazard identification from job site photos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Load Sample Inspection</span>
        </button>
      </div>

      {/* Upload & Context Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Uploader */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Site Image Upload
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors bg-slate-50 relative min-h-[190px] flex flex-col justify-center items-center">
              {preview ? (
                <div className="space-y-2">
                  <img src={preview} alt="Inspection Preview" className="max-h-40 mx-auto rounded-lg object-contain shadow-xs" />
                  <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs">{file?.name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-medium">Drag & drop site photo or click to browse</p>
                  <p className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP (Up to 10MB)</p>
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

          {/* Context Notes */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Inspection Context / Location Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., North wing scaffolding deck, level 3 rebar installation crew..."
                rows={4}
                className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <HardHat className="w-4 h-4" />
              <span>{loading ? 'Analyzing Site Safety...' : 'Run Safety Inspection'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}
      </form>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Overview Score Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Audit Record #{result.id}</span>
              <h3 className="text-sm font-semibold text-slate-700">{result.timestamp}</h3>
              <p className="text-xs text-slate-500">FastAPI JSON Contract Verified</p>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Compliance Score</span>
              <div className="text-3xl font-extrabold text-blue-600 mt-1">{result.overall_compliance_score}%</div>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Risk Assessment</span>
              <div className="mt-1">
                <span className={`inline-block px-3 py-1 text-xs font-extrabold uppercase rounded-full border ${getRiskBadge(result.risk_level)}`}>
                  {result.risk_level} Risk
                </span>
              </div>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">Workers Detected</span>
              <div className="text-3xl font-extrabold text-slate-800 mt-1 flex items-center justify-center space-x-1.5">
                <Users className="w-5 h-5 text-slate-500" />
                <span>{result.total_workers_detected}</span>
              </div>
            </div>
          </div>

          {/* PPE Compliance Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <HardHat className="w-4 h-4 text-blue-600" />
              <span>Personal Protective Equipment (PPE) Checklist</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.ppe_checklist?.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{item.item}</span>
                    {item.status === 'Compliant' ? (
                      <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Compliant</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" />
                        <span>{item.status}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{item.notes}</p>
                  <div className="text-[10px] text-slate-400 font-mono text-right">
                    Confidence: {Math.round(item.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Identified Hazards */}
          {result.hazards_detected?.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Identified Site Hazards & Corrective Actions</span>
              </h3>

              <div className="space-y-3">
                {result.hazards_detected.map((hz, i) => (
                  <div key={i} className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-red-900">{hz.hazard_type}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {hz.location}
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-200 text-red-800">
                        {hz.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">{hz.description}</p>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-800">
                      <strong className="text-blue-700">Corrective Action: </strong>
                      {hz.recommended_action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Toolbox Talk Recommendations
              </h4>
              <ul className="space-y-2">
                {result.toolbox_recommendations?.map((rec, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Auditor Summary
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {result.compliance_summary}
              </p>
              <button 
                onClick={() => window.print()}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Formal Safety Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
