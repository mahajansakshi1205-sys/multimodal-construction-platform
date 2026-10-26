import React from 'react';
import { 
  ShieldAlert, 
  SearchCheck, 
  Building2, 
  CalendarClock, 
  CloudSun, 
  ArrowRight, 
  Layers, 
  CheckCircle, 
  ExternalLink,
  Cpu,
  Database,
  Code2
} from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
  const skills = [
    'Python (Programming Language)',
    'FastAPI',
    'React.js (Javascript Library)',
    'Large Language Modeling',
    'Prompt Engineering',
    'HTML5',
    'CSS Frameworks (Tailwind)',
    'Pydantic Contracts'
  ];

  const modules = [
    {
      id: 'safety',
      title: 'Construction Site Safety Monitoring',
      desc: 'Multimodal vision model inspects worker PPE compliance (hard hats, vests, boots) and flags high-risk hazards.',
      icon: ShieldAlert,
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'cracks',
      title: 'Structural Crack Detection & Analysis',
      desc: 'Classifies crack geometry, assesses structural integrity risk scores, and prescribes technical repair procedures.',
      icon: SearchCheck,
      color: 'bg-red-50 text-red-700 border-red-200 hover:border-red-400',
      iconBg: 'bg-red-100 text-red-700',
    },
    {
      id: 'valuation',
      title: 'Real Estate Valuation',
      desc: 'Synthesizes structural quality, location tiers, and property parameters into robust valuation forecasts and ROI metrics.',
      icon: Building2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'planning',
      title: 'Construction Project Planning & WBS',
      desc: 'Generates comprehensive Work Breakdown Structures, milestone timelines, resource estimates, and critical paths.',
      icon: CalendarClock,
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400',
      iconBg: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'advisory',
      title: 'Daily Site Assistance & Weather Advisory',
      desc: 'Evaluates real-time weather impacts on concrete curing, crane lifts, and roofing with automated daily site logs.',
      icon: CloudSun,
      color: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400',
      iconBg: 'bg-sky-100 text-sky-700',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title & Category Badges */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white tracking-wide shadow-xs">
            Real Estate
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 tracking-wide">
            Individual & Enterprise
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            System Online
          </span>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Multimodal Construction Intelligence Platform
          </h1>
          <p className="text-slate-600 leading-relaxed mt-3 text-sm md:text-base">
            The <strong>AI-Powered Multimodal Construction Intelligence Platform</strong> is an intelligent, full-stack decision-support system designed to assist construction professionals across multiple stages of construction planning, execution, and monitoring. The platform leverages <strong>multimodal artificial intelligence</strong>, enabling it to analyze <strong>textual inputs, construction images, and structured project data</strong> to generate accurate, actionable, and context-aware insights. Traditional construction management practices rely heavily on manual supervision, static documentation, and experience-based judgments. These methods often fail to provide real-time intelligence, integrated safety analysis, or automated planning support. To address these challenges, this platform integrates a <strong>React.js frontend with a FastAPI-based Python backend</strong>, powered by a multimodal large language model. Strict JSON-based data contracts ensure frontend stability and reliable AI integration.
          </p>
        </div>

        {/* Skills Required */}
        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Skills Required & Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project Stats (matching Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-6 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-indigo-200 text-xs uppercase tracking-wider font-semibold">
            <span>Project Epics</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold pt-2">Total Epics: 9</div>
          <p className="text-xs text-indigo-200">Full lifecycle coverage: Planning to Audit</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-emerald-200 text-xs uppercase tracking-wider font-semibold">
            <span>Stories & Tasks</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold pt-2">Total Tasks: 18</div>
          <p className="text-xs text-emerald-200">100% Implemented & Contract Verified</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-300 text-xs uppercase tracking-wider font-semibold">
            <span>Architecture Layer</span>
            <Code2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold pt-2">FastAPI + React</div>
          <p className="text-xs text-slate-300">Pydantic strict schema JSON contracts</p>
        </div>
      </div>

      {/* Technical Architecture Visual Diagram (matching Image 4) */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Technical Architecture Overview</h2>
            <p className="text-xs text-slate-500">Multimodal pipeline connecting React UI, FastAPI service layer, and Multimodal Vision AI</p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
            System Architecture
          </span>
        </div>

        {/* Visual pipeline blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Built With</span>
            <h4 className="font-bold text-slate-800 text-sm">React Frontend</h4>
            <p className="text-[11px] text-slate-500">Interactive web application dashboard with real-time analytics</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Receives</span>
            <h4 className="font-bold text-slate-800 text-sm">User Inputs</h4>
            <p className="text-[11px] text-slate-500">High-res images, structural data, site logs & engineering queries</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">API Engine</span>
            <h4 className="font-bold text-slate-800 text-sm">FastAPI + SQLite</h4>
            <p className="text-[11px] text-slate-500">Strict schema validation & persistent audit database</p>
          </div>

          <div className="p-4 bg-blue-600 text-white rounded-xl text-center space-y-2 shadow-sm">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wide">Generates</span>
            <h4 className="font-bold text-white text-sm">Multimodal AI (LLM+Vision)</h4>
            <p className="text-[11px] text-blue-100">Safety, Cracks, Valuation, WBS & Advisory</p>
          </div>
        </div>
      </div>

      {/* Interactive Core Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Launch Decision-Support Engines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div 
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${m.color} shadow-xs hover:shadow-md`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${m.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-60" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-blue-700">
                  <span>Open Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
