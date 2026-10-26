import React, { useState } from 'react';
import { 
  CalendarClock, 
  Layers, 
  DollarSign, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Printer 
} from 'lucide-react';
import { generateProjectPlan } from '../services/api';

export default function ProjectPlanning() {
  const [projectName, setProjectName] = useState('Apex Skyline Tower');
  const [buildingType, setBuildingType] = useState('High-Rise Residential');
  const [budget, setBudget] = useState(3800000);
  const [months, setMonths] = useState(18);
  const [siteArea, setSiteArea] = useState(24000);
  const [requirements, setRequirements] = useState('Deep bored cast-in-situ piles, LEED Silver targeted, seismic zone 4 detailing.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        project_name: projectName,
        building_type: buildingType,
        total_budget_usd: budget,
        target_duration_months: months,
        site_area_sqft: siteArea,
        special_requirements: requirements,
      };
      const data = await generateProjectPlan(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Project plan generation failed.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 mb-1">
            <CalendarClock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Project Management AI</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Construction Planning & Work Breakdown (WBS)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated phase scheduling, critical path method (CPM) synthesis, and resource planning.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setProjectName('Metropolitan Commercial Centre');
            setBuildingType('Commercial Office');
            setBudget(6200000);
            setMonths(24);
          }}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Preset Commercial Tower</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Building Typology
            </label>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="High-Rise Residential">High-Rise Residential</option>
              <option value="Commercial Office">Commercial Office</option>
              <option value="Warehouse">Warehouse & Logistics Facility</option>
              <option value="Bridge/Infrastructure">Bridge / Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Target Budget (USD)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              min={10000}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Planned Duration (Months)
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              min={1}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Site Footprint (sq. ft.)
            </label>
            <input
              type="number"
              value={siteArea}
              onChange={(e) => setSiteArea(Number(e.target.value))}
              min={500}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Engineering Specifications & Constraints
          </label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={2}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <Layers className="w-4 h-4" />
          <span>{loading ? 'Synthesizing WBS & Critical Path...' : 'Generate Project Plan & Schedule'}</span>
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}
      </form>

      {/* Output Schedule */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Key Metric Overview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Duration</span>
              <div className="text-2xl font-extrabold text-blue-600 mt-1 flex items-center justify-center space-x-1.5">
                <Clock className="w-4 h-4" />
                <span>{result.total_estimated_duration_weeks} Wks</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Estimated Budget</span>
              <div className="text-xl font-extrabold text-slate-800 mt-1">
                {formatCurrency(result.total_estimated_cost_usd)}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700">Contingency Reserve</span>
              <div className="text-xl font-extrabold text-amber-800 mt-1">
                {formatCurrency(result.contingency_budget_usd)}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Peak Crew Size</span>
              <div className="text-2xl font-extrabold text-slate-800 mt-1 flex items-center justify-center space-x-1.5">
                <Users className="w-4 h-4 text-slate-500" />
                <span>{result.recommended_crew_size}</span>
              </div>
            </div>
          </div>

          {/* Work Breakdown Structure (WBS) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Work Breakdown Structure (WBS) & CPM Phases</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Plan #{result.id}</span>
            </div>

            <div className="space-y-4">
              {result.phases?.map((phase, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    phase.critical_path 
                      ? 'bg-red-50/30 border-red-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {phase.phase_id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{phase.phase_name}</h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {phase.duration_weeks} Weeks
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {formatCurrency(phase.estimated_cost_usd)}
                      </span>
                      {phase.critical_path && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300">
                          Critical Path
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Milestone Tasks</span>
                    <ul className="space-y-1">
                      {phase.tasks?.map((task, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-600 flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {phase.dependencies?.length > 0 && (
                    <div className="mt-2 text-[11px] text-slate-400 font-mono">
                      Depends on: {phase.dependencies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones & Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Milestones */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Major Project Milestones
              </h4>
              <div className="space-y-2">
                {result.key_milestones?.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">{m.milestone}</span>
                    <span className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {m.target_week}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Project Risks */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Risk Management & Mitigations
              </h4>
              <div className="space-y-2.5">
                {result.top_project_risks?.map((risk, i) => (
                  <div key={i} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{risk.risk}</span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-800">
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <strong className="text-slate-800">Mitigation: </strong> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Master Schedule PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
