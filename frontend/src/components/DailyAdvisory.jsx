import React, { useState } from 'react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Sparkles, 
  Printer 
} from 'lucide-react';
import { evaluateDailyAdvisory } from '../services/api';

export default function DailyAdvisory() {
  const [location, setLocation] = useState('Metro Sector 9 Infrastructure Zone');
  const [temp, setTemp] = useState(29);
  const [weather, setWeather] = useState('High Winds');
  const [wind, setWind] = useState(38);
  const [humidity, setHumidity] = useState(65);
  const [activities, setActivities] = useState(['Crane Operations', 'Concrete Pouring', 'Roofing', 'Exterior Painting']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const availableActivities = [
    'Crane Operations',
    'Concrete Pouring',
    'Roofing',
    'Exterior Painting',
    'Excavation & Trenching',
    'Scaffolding Erection'
  ];

  const toggleActivity = (act) => {
    setActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const handleSimulateHeavyRain = () => {
    setWeather('Rain / Downpour');
    setTemp(19);
    setWind(28);
    setHumidity(92);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        site_location: location,
        current_temperature_c: temp,
        weather_condition: weather,
        wind_speed_kmh: wind,
        humidity_pct: humidity,
        scheduled_activities: activities
      };
      const data = await evaluateDailyAdvisory(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Advisory evaluation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-sky-600 mb-1">
            <CloudSun className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Meteorological Risk Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Daily Site Assistance & Weather Advisory</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time hazard advisory correlating environmental metrics with trade-specific activities (concrete pours, crane picks, roofing).
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulateHeavyRain}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Simulate Heavy Rain</span>
        </button>
      </div>

      {/* Input Parameters Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Construction Site Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Atmospheric Condition
            </label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            >
              <option value="Sunny">Sunny / Clear Skies</option>
              <option value="Rain / Downpour">Rain / Active Precipitation</option>
              <option value="High Winds">High Winds / Gale Warnings</option>
              <option value="Extreme Heat">Extreme Heat (&gt;35°C)</option>
              <option value="Freezing / Snow">Freezing / Frost Conditions</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Ambient Temperature (°C)
            </label>
            <div className="relative">
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full text-xs p-2.5 pl-8 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <Thermometer className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Wind Velocity (km/h)
            </label>
            <div className="relative">
              <input
                type="number"
                value={wind}
                onChange={(e) => setWind(Number(e.target.value))}
                className="w-full text-xs p-2.5 pl-8 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <Wind className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Relative Humidity (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full text-xs p-2.5 pl-8 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <Droplets className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>
        </div>

        {/* Scheduled Activities Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Today's Scheduled High-Risk Site Activities
          </label>
          <div className="flex flex-wrap gap-2">
            {availableActivities.map((act, idx) => {
              const selected = activities.includes(act);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleActivity(act)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    selected 
                      ? 'bg-sky-100 border-sky-300 text-sky-800 shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {selected ? '✓ ' : '+ '} {act}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <CloudSun className="w-4 h-4" />
          <span>{loading ? 'Evaluating Meteorological Hazards...' : 'Generate Daily Site Advisory'}</span>
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}
      </form>

      {/* Advisory Output */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Status Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
            result.overall_site_condition.includes('GREEN')
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-75">
                Site Advisory #{result.id} • {result.timestamp}
              </span>
              <h3 className="text-xl font-extrabold mt-1">{result.overall_site_condition}</h3>
              <p className="text-xs opacity-80 mt-1">Location: {result.site_location}</p>
            </div>

            <div className="flex items-center space-x-2">
              {result.overall_site_condition.includes('GREEN') ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
              )}
            </div>
          </div>

          {/* Activity Impact Matrix */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Trade Activity Safety Impact Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.activity_impacts?.map((imp, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border space-y-2 ${
                    imp.safe_to_proceed 
                      ? 'bg-slate-50 border-slate-200' 
                      : 'bg-red-50/60 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{imp.activity}</span>
                    {imp.safe_to_proceed ? (
                      <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Authorized</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" />
                        <span>Halt / Prohibited</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{imp.advisory_notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Alerts & Toolbox of Day */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Alerts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Weather Advisory Notices</span>
              </h4>
              <ul className="space-y-2">
                {result.weather_risk_alerts?.map((alert, i) => (
                  <li key={i} className="text-xs text-slate-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 leading-relaxed">
                    {alert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Toolbox Talk of the Day */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Toolbox Talk of the Day</span>
              </h4>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-2">
                <h5 className="text-xs font-bold text-blue-900">{result.toolbox_talk_of_the_day?.topic}</h5>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {result.toolbox_talk_of_the_day?.key_points}
                </p>
              </div>

              <button 
                onClick={() => window.print()}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Daily Site Briefing</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
