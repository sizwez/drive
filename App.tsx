
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RoadSigns from './components/RoadSigns';
import AITutor from './components/AITutor';
import PracticeTests from './components/PracticeTests';
import DLTCFinder from './components/DLTCFinder';
import VehicleControls from './components/VehicleControls';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'signs':
        return <RoadSigns />;
      case 'tutor':
        return <AITutor />;
      case 'tests':
        return <PracticeTests />;
      case 'dltc':
        return <DLTCFinder />;
      case 'rules':
        return (
          <div className="space-y-12 max-w-6xl mx-auto">
            <header>
              <h2 className="text-3xl font-bold text-slate-800">Learning Modules</h2>
              <p className="text-slate-500">Master the theoretical components of the K53 exam.</p>
            </header>
            
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-700">Rules of the Road</h3>
                <span className="text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Core Content</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "General Rules", items: ["Overtaking", "Keeping Left", "Passing oncoming traffic"] },
                  { title: "Intersections", items: ["Four-way stops", "Roundabouts (Traffic circles)", "Controlled intersections"] },
                  { title: "Speed Limits", items: ["Urban areas: 60km/h", "Rural areas: 100km/h", "Freeways: 120km/h"] },
                  { title: "Stopping & Parking", items: ["Prohibited areas", "Emergency stopping", "Signal use"] }
                ].map((group, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                    <h4 className="font-bold text-lg text-slate-800 mb-4 group-hover:text-blue-600">{group.title}</h4>
                    <ul className="space-y-3">
                      {group.items.map((item, j) => (
                        <li key={j} className="flex items-start space-x-3 text-sm text-slate-600">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 text-sm text-blue-600 font-bold hover:underline inline-flex items-center">
                      Detailed Guide <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-700">Vehicle Controls</h3>
                <span className="text-xs text-purple-600 font-bold uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">Practical Theory</span>
              </div>
              <VehicleControls />
            </section>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
