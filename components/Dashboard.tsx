
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, CheckCircle, Clock, Trophy, MapPin, Star, ExternalLink } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = React.useState({
    signs: '12/120',
    tests: '3',
    time: '2.5h',
    score: '75%'
  });

  React.useEffect(() => {
    // Simulated persistence load
    const saved = localStorage.getItem('k53_stats');
    if (saved) setStats(JSON.parse(saved));
  }, []);

  const data = [
    { name: 'Completed', value: 35, color: '#3b82f6' },
    { name: 'Remaining', value: 65, color: '#e2e8f0' },
  ];

  const statItems = [
    { label: 'Signs Mastered', value: stats.signs, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Tests Attempted', value: stats.tests, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Study Time', value: stats.time, icon: Clock, color: 'text-amber-600' },
    { label: 'Avg. Score', value: stats.score, icon: Trophy, color: 'text-purple-600' },
  ];

  const sponsors = [
    { name: "TopGear Driving Academy", location: "Cape Town", rating: 4.8, reviews: 120, price: "R250/hr" },
    { name: "SafeWay K53 School", location: "Johannesburg", rating: 4.9, reviews: 85, price: "R220/hr" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Your Learning Journey</h2>
          <p className="text-slate-500 text-sm">Every minute spent studying brings you closer to your license.</p>
        </div>
        <div className="hidden sm:block">
           <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50">
             Share Progress
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Readiness Score</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Update Daily</span>
          </div>
          <div className="h-64 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8 md:pb-0">
                  <span className="text-3xl font-bold text-slate-800">35%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Ready</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4 px-4">
              {[
                { label: 'Rules', pct: 45, color: 'bg-blue-600' },
                { label: 'Signs', pct: 15, color: 'bg-amber-500' },
                { label: 'Controls', pct: 85, color: 'bg-green-500' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Driving Schools Near You</h3>
            <div className="space-y-4">
              {sponsors.map((school, i) => (
                <div key={i} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 text-sm">{school.name}</h4>
                    <span className="text-xs font-bold text-green-600">{school.price}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <div className="flex items-center">
                      <Star size={12} className="text-amber-400 fill-amber-400 mr-1" />
                      {school.rating}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {school.location}
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    Book Lesson
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
            <h3 className="font-bold text-lg mb-2">Ready for the real thing?</h3>
            <p className="text-blue-100 text-sm mb-4">Book your official learners test appointment via the Natis online portal.</p>
            <a 
              href="https://online.natis.gov.za" 
              target="_blank" 
              className="flex items-center justify-center space-x-2 bg-white text-blue-700 py-3 rounded-xl font-bold text-sm hover:bg-blue-50"
            >
              <span>Go to Natis</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
