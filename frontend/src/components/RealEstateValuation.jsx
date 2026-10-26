import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  UploadCloud, 
  PieChart, 
  Printer,
  Sparkles
} from 'lucide-react';
import { estimateValuation } from '../services/api';

export default function RealEstateValuation() {
  const [propertyType, setPropertyType] = useState('Commercial');
  const [area, setArea] = useState(3500);
  const [tier, setTier] = useState('Tier 1 - Prime Metro');
  const [quality, setQuality] = useState('Luxury');
  const [age, setAge] = useState(2);
  const [zoning, setZoning] = useState('Commercial C-3');
  const [amenities, setAmenities] = useState(['Underground Parking', 'High-speed Elevators', 'LEED Certified']);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const availableAmenities = [
    'Underground Parking',
    'High-speed Elevators',
    'LEED Certified',
    'Solar Array / Renewable Microgrid',
    'Fiber Optic Backbone',
    '24/7 Security Operations Center'
  ];

  const toggleAmenity = (item) => {
    setAmenities(prev => 
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handlePreloadCommercial = () => {
    setPropertyType('Commercial');
    setArea(5200);
    setTier('Tier 1 - Prime Metro');
    setQuality('Luxury');
    setAge(1.5);
    setZoning('CBD Commercial');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('property_type', propertyType);
      formData.append('built_up_area_sqft', area);
      formData.append('location_tier', tier);
      formData.append('construction_quality', quality);
      formData.append('age_of_structure_years', age);
      formData.append('zoning', zoning);
      formData.append('amenities', JSON.stringify(amenities));
      if (file) {
        formData.append('file', file);
      }

      const data = await estimateValuation(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Valuation estimation failed.');
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
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <Building2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Asset Valuation AI</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Real Estate & Structural Valuation</h2>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic property valuation calculating depreciated replacement cost, location tier dynamics, and quality multipliers.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePreloadCommercial}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Preset Prime Commercial</span>
        </button>
      </div>

      {/* Input Parameters Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Property Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Property Asset Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Commercial">Commercial Office</option>
              <option value="Residential">Residential High-Rise / Villa</option>
              <option value="Industrial">Industrial Logistics Hub</option>
              <option value="Mixed-Use">Mixed-Use Commercial/Residential</option>
            </select>
          </div>

          {/* Built-Up Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Built-Up Area (sq. ft.)
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              min={100}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Location Tier */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Macro Location Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Tier 1 - Prime Metro">Tier 1 - Prime Metro Central</option>
              <option value="Tier 2 - Urban">Tier 2 - Developing Urban Corridor</option>
              <option value="Tier 3 - Suburban">Tier 3 - Suburban Fringe</option>
            </select>
          </div>

          {/* Construction Quality */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Structural Specification Grade
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Luxury">Luxury Grade A+ Specifications</option>
              <option value="Standard">Standard Developer Spec</option>
              <option value="Economy">Economy / Value Engineering</option>
            </select>
          </div>

          {/* Age of Structure */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Structure Age (Years)
            </label>
            <input
              type="number"
              step="0.5"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={0}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Zoning */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Municipal Zoning
            </label>
            <input
              type="text"
              value={zoning}
              onChange={(e) => setZoning(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Amenities Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Building Infrastructure & Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {availableAmenities.map((amenity, idx) => {
              const selected = amenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleAmenity(amenity)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    selected 
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {selected ? '✓ ' : '+ '} {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Facade Photo Upload (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Building Facade / Elevation Photo (Optional Vision Analysis)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />
            {preview && (
              <img src={preview} alt="Facade Preview" className="h-10 w-16 object-cover rounded-md border border-slate-200" />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <DollarSign className="w-4 h-4" />
          <span>{loading ? 'Synthesizing Valuation Models...' : 'Calculate Property Valuation'}</span>
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}
      </form>

      {/* Valuation Output */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main Valuation Summary Card */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-200 font-semibold">
                  RICS Valuation Assessment #{result.id}
                </span>
                <div className="text-3xl md:text-5xl font-black tracking-tight">
                  {formatCurrency(result.estimated_market_value)}
                </div>
                <p className="text-xs text-emerald-100 pt-1">
                  Average rate: ${result.price_per_sqft_range?.avg?.toFixed(2)} / sq.ft.
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8 space-y-2">
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-emerald-200">Projected Annual ROI</span>
                  <div className="text-2xl font-bold flex items-center justify-end space-x-1">
                    <TrendingUp className="w-5 h-5 text-emerald-300" />
                    <span>{result.estimated_annual_roi_pct}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-emerald-200">Confidence Score</span>
                  <div className="text-xl font-bold">{result.confidence_score}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown & Price Ranges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Per Sq Ft Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Price per Sq. Ft. Dispersion</span>
              </h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Minimum</span>
                  <div className="text-base font-bold text-slate-700 mt-1">
                    ${result.price_per_sqft_range?.min}
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold">Base Average</span>
                  <div className="text-base font-extrabold text-emerald-700 mt-1">
                    ${result.price_per_sqft_range?.avg}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Maximum</span>
                  <div className="text-base font-bold text-slate-700 mt-1">
                    ${result.price_per_sqft_range?.max}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Valuation Breakdown</h4>
                <div className="space-y-2">
                  {result.valuation_breakdown && Object.entries(result.valuation_breakdown).map(([k, v], idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600 font-medium">{k}</span>
                      <span className="font-bold text-slate-900 font-mono">{formatCurrency(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drivers & Market Commentary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Key Value Drivers</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.key_value_drivers?.map((driver, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Market Outlook</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {result.market_outlook}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Formal Appraisal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
