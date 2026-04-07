// src/pages/admin/components/SmMotorSection.tsx
import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';

interface LogEntry { time: string; message: string; type: 'info' | 'success' | 'error'; }

export default function SmMotorSection() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [deals, setDeals] = useState<unknown[]>([]);
  const [nextRun, setNextRun] = useState('');

  useEffect(() => {
    // Beräkna nästa körning kl 20:00
    const now = new Date();
    const target = new Date();
    target.setHours(20, 0, 0, 0);
    if (now >= target) target.setDate(target.getDate() + 1);
    setNextRun(target.toLocaleString('sv-SE'));

    // Hämta aktiva deals
    fetch(`${API}/api/deals`)
      .then(r => r.json())
      .then(d => setDeals(Array.isArray(d) ? d : []));
  }, []);

  const runEngine = async () => {
    setRunning(true);
    setLogs([{ time: new Date().toLocaleTimeString('sv-SE'), message: 'Startar Sista-minuten-motor...', type: 'info' }]);
    try {
      const res = await fetch(`${API}/api/admin/run-sm-engine`, {
        method: 'POST',
        headers: { 'x-admin-password': 'TeeRadar2026!' }
      });
      const data = await res.json();
      if (data.success) {
        setLogs(prev => [...prev,
          { time: new Date().toLocaleTimeString('sv-SE'), message: `✅ Klar! ${data.deals_created || 0} deals publicerade`, type: 'success' },
        ]);
        // Uppdatera deals
        fetch(`${API}/api/deals`).then(r => r.json()).then(d => setDeals(Array.isArray(d) ? d : []));
      } else {
        setLogs(prev => [...prev,
          { time: new Date().toLocaleTimeString('sv-SE'), message: `❌ Fel: ${data.error || 'Okänt fel'}`, type: 'error' },
        ]);
      }
    } catch (err) {
      setLogs(prev => [...prev,
        { time: new Date().toLocaleTimeString('sv-SE'), message: `❌ Kunde inte nå backend`, type: 'error' },
      ]);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-tee-green">Sista-minuten-motor</h1>
        <p className="text-gray-500 text-sm mt-1">Hämtar och publicerar rabatterade starttider varje kväll kl 20:00</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aktiva deals just nu</div>
          <div className="text-3xl font-bold text-tee-green">{deals.length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nästa automatiska körning</div>
          <div className="text-sm font-semibold text-gray-900">{nextRun}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-center">
          <button onClick={runEngine} disabled={running}
            className="flex items-center gap-2 px-6 py-3 bg-tee-gold text-tee-green font-bold rounded-xl hover:bg-tee-gold/90 disabled:opacity-60 transition-all">
            {running ? (
              <><div className="w-4 h-4 border-2 border-tee-green border-t-transparent rounded-full animate-spin" /> Kör...</>
            ) : (
              <><i className="ri-play-fill" /> Kör nu manuellt</>
            )}
          </button>
        </div>
      </div>

      {/* Log */}
      {logs.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-4 font-mono text-sm">
          {logs.map((log, i) => (
            <div key={i} className={`mb-1 ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
              <span className="text-gray-500 mr-2">{log.time}</span>{log.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
