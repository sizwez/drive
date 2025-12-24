
import React from 'react';

const controls = [
  { id: 1, name: 'Steering Wheel', pos: { top: '35%', left: '30%' } },
  { id: 2, name: 'Gear Lever', pos: { top: '65%', left: '50%' } },
  { id: 3, name: 'Handbrake', pos: { top: '75%', left: '55%' } },
  { id: 4, name: 'Clutch Pedal', pos: { top: '80%', left: '25%' } },
  { id: 5, name: 'Brake Pedal', pos: { top: '80%', left: '33%' } },
  { id: 6, name: 'Accelerator', pos: { top: '80%', left: '42%' } },
  { id: 7, name: 'Rear View Mirror', pos: { top: '15%', left: '50%' } },
  { id: 8, name: 'Side Mirror', pos: { top: '30%', left: '5%' } }
];

const VehicleControls: React.FC = () => {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden aspect-video md:aspect-[21/9]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        
        <h3 className="text-2xl font-bold mb-2 relative z-10">Cockpit Layout</h3>
        <p className="text-slate-400 text-sm mb-8 relative z-10">Memorize the numbers for the test.</p>

        <div className="relative h-full border-2 border-white/10 rounded-3xl bg-black/40 backdrop-blur-sm">
          {/* Mock Dashboard UI */}
          {controls.map((ctrl) => (
            <button
              key={ctrl.id}
              onMouseEnter={() => setActive(ctrl.id)}
              onMouseLeave={() => setActive(null)}
              className={`
                absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all
                ${active === ctrl.id ? 'bg-blue-600 scale-125 z-20 ring-4 ring-blue-500/50' : 'bg-white/10 hover:bg-white/20 text-white/60'}
              `}
              style={{ top: ctrl.pos.top, left: ctrl.pos.left }}
            >
              {ctrl.id}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {controls.map((ctrl) => (
          <div 
            key={ctrl.id}
            className={`
              p-4 rounded-2xl border transition-all
              ${active === ctrl.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}
            `}
          >
            <span className="text-xs font-black text-slate-300 mr-2">#{ctrl.id}</span>
            <span className="font-bold text-slate-800 text-sm">{ctrl.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleControls;
