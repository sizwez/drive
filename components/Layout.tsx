
import React from 'react';
import { Home, BookOpen, PenTool, BarChart2, MessageSquare, Menu, X, MapPin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'signs', label: 'Road Signs', icon: BookOpen },
    { id: 'rules', label: 'Rules & Controls', icon: PenTool },
    { id: 'tests', label: 'Practice Tests', icon: BarChart2 },
    { id: 'tutor', label: 'AI Tutor', icon: MessageSquare },
    { id: 'dltc', label: 'DLTC Finder', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-blue-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-bold">K53 Master</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <h1 className="hidden md:block text-2xl font-bold text-blue-700 mb-8 tracking-tight">K53 Master</h1>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                  ${activeTab === item.id 
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-100' 
                    : 'text-slate-600 hover:bg-slate-50'}
                `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-100">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-5 text-white shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Premium</p>
            <p className="text-sm font-medium mb-4 leading-tight">Unlock AI Audio lessons & Mock Exams.</p>
            <button className="w-full bg-white text-blue-700 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
