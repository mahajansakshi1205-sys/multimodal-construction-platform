import React, { useState } from 'react';
import { 
  MessagesSquare, 
  Send, 
  BookOpen, 
  Sparkles, 
  User, 
  Bot, 
  ExternalLink,
  ChevronRight 
} from 'lucide-react';
import { askKnowledgeChat } from '../services/api';

export default function KnowledgeChat() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Structural Concrete');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to the Construction Engineering & Safety Knowledge Assistant. I can assist you with International Building Codes (IBC), OSHA CFR 1926 regulations, ACI 318 structural specifications, and ASTM material testing guidelines. What engineering inquiry would you like to explore today?',
      standards: ['OSHA 29 CFR 1926', 'IBC 2024', 'ACI 318-19'],
      followups: [
        'What is the minimum concrete curing duration prior to formwork stripping?',
        'What are the mandatory scaffolding tie-off heights under OSHA?',
        'How is concrete slump loss handled in high-temperature placements?'
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'Minimum curing time before stripping structural beam formwork?',
    'OSHA fall protection trigger heights for residential vs steel erection?',
    'Maximum allowed deflection under live load for reinforced floor slabs?'
  ];

  const handleSend = async (textToSend) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const data = await askKnowledgeChat(q, category);
      const botMsg = {
        role: 'assistant',
        content: data.response,
        standards: data.referenced_standards,
        followups: data.recommended_followups
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${err.message || 'Unable to retrieve knowledge response.'}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[760px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 mb-1">
            <MessagesSquare className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Engineering Q&A Copilot</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Construction Knowledge Assistant</h2>
          <p className="text-xs text-slate-500 mt-1">
            Certified technical reasoning over IBC, OSHA, ACI 318, and ASTM structural codes.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold uppercase">Focus Domain:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
          >
            <option value="Structural Concrete">Structural Concrete (ACI)</option>
            <option value="OSHA Safety">OSHA Safety Regulations</option>
            <option value="Building Codes IBC">Building Codes (IBC)</option>
            <option value="Material Testing">ASTM Material Testing</option>
          </select>
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-xl rounded-2xl p-4 space-y-3 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none shadow-xs' 
                : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'
            }`}>
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>

              {/* Referenced Standards */}
              {msg.standards?.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Applicable Engineering Standards
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.standards.map((std, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white text-indigo-700 border border-slate-200">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Followups */}
              {msg.followups?.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Recommended Inquiries
                  </span>
                  <div className="space-y-1">
                    {msg.followups.map((f, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(f)}
                        className="w-full text-left text-[11px] text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50/50 p-1.5 rounded flex items-center justify-between transition-colors"
                      >
                        <span>{f}</span>
                        <ChevronRight className="w-3 h-3 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-slate-400 text-xs italic p-2">
            <Bot className="w-4 h-4 animate-spin text-indigo-500" />
            <span>Consulting structural building codes...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs shrink-0 space-y-3">
        {/* Quick Prompts */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Quick Test:</span>
          {samplePrompts.map((p, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }} 
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask an engineering or compliance question under ${category}...`}
            className="flex-1 text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
