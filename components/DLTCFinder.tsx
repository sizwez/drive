
import React from 'react';
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react';
import { findNearbyDLTCs } from '../services/geminiService';

const DLTCFinder: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFind = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await findNearbyDLTCs(pos.coords.latitude, pos.coords.longitude);
          setResults(data);
        } catch (err) {
          setError("Failed to fetch testing centers. Please check your connection.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please enable location to find DLTCs.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
            <MapPin size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Find Testing Centres</h2>
            <p className="text-slate-500 text-sm">Locate the nearest DLTC to book your Learners or Drivers test.</p>
          </div>
        </div>
        {!results && !loading && (
          <button 
            onClick={handleFind}
            className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all"
          >
            <Navigation size={18} />
            <span>Find Centres Near Me</span>
          </button>
        )}
      </header>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="text-slate-500 font-medium animate-pulse">Scanning South Africa for Testing Centres...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
            <h3 className="font-bold text-slate-800 mb-4">AI Recommendations</h3>
            <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
              {results.text}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 px-2">Location Links</h3>
            {results.links.map((chunk: any, i: number) => (
              chunk.maps && (
                <a 
                  key={i}
                  href={chunk.maps.uri}
                  target="_blank"
                  className="block bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin size={18} />
                      </div>
                      <span className="font-bold text-slate-800">{chunk.maps.title || "View on Maps"}</span>
                    </div>
                    <ExternalLink size={16} className="text-slate-300" />
                  </div>
                </a>
              )
            ))}
            {results.links.length === 0 && (
              <p className="text-center py-10 text-slate-400 italic">No specific location links returned. Check the AI notes.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DLTCFinder;
