import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import SafetyMonitoring from './components/SafetyMonitoring';
import CrackAnalysis from './components/CrackAnalysis';
import RealEstateValuation from './components/RealEstateValuation';
import ProjectPlanning from './components/ProjectPlanning';
import DailyAdvisory from './components/DailyAdvisory';
import KnowledgeChat from './components/KnowledgeChat';
import ReportsHistory from './components/ReportsHistory';
import ConfigModal from './components/ConfigModal';
import { getConfigStatus } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [configStatus, setConfigStatus] = useState(null);

  const fetchStatus = async () => {
    try {
      const data = await getConfigStatus();
      setConfigStatus(data);
    } catch (e) {
      console.warn('Backend not responding yet');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'safety':
        return <SafetyMonitoring />;
      case 'cracks':
        return <CrackAnalysis />;
      case 'valuation':
        return <RealEstateValuation />;
      case 'planning':
        return <ProjectPlanning />;
      case 'advisory':
        return <DailyAdvisory />;
      case 'knowledge':
        return <KnowledgeChat />;
      case 'history':
        return <ReportsHistory />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          onOpenConfig={() => setConfigModalOpen(true)}
          configStatus={configStatus}
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* API Key / Intelligence Configuration Modal */}
      <ConfigModal 
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        configStatus={configStatus}
        onRefreshStatus={fetchStatus}
      />
    </div>
  );
}
