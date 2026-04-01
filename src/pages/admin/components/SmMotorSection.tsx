import { useEffect, useState } from 'react';
import { Play, RefreshCw, CheckCircle, XCircle, Info, Zap } from 'lucide-react';
import { triggerSmMotor, getSmLog, type SmLogEntry } from '../../../api/admin';

function statusIcon(status: SmLogEntry['status']) {
  if (status === 'success') return <CheckCircle size={15} className="text-green-500 flex-shrink-0" />;
  if (status === 'error') return <XCircle size={15} className="text-red-500 flex-shrink-0" />;
  return <Info size={15} className="text-blue-400 flex-shrink-0" />;
}

function statusRowCls(status: SmLogEntry['status']) {
  if (status === 'success') return 'bg-green-50 border-green-100';
  if (status === 'error') return 'bg-red-50 border-red-100';
  return 'bg-blue-50 border-blue-100';
}

export default function SmMotorSection() {
  const [log, setLog] = useState<SmLogEntry[]>([]);
  const [loadingLog, setLoadingLog] = useState(true);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<{ message: string; deals_found?: number } | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  const loadLog = () => {
    setLoadingLog(true);
    getSmLog()
      .then(setLog)
      .catch(() => setLog([]))
      .finally(() => setLoadingLog(false));
  };

  useEffect(() => { loadLog(); }, []);

  const handleRun = async () => {
    setRunning(true);
    setRunResult(null);
    setRunError(null);
    try {
      const result = await triggerSmMotor();
      setRunResult(result);
      loadLog();
    } catch (e) {
      setRunError((e as Error).message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-tee-green">SM-motor</h2>
        <p className="text-sm text-tee-green/50 mt-0.5">
          Kör last-minute-motorn manuellt eller se statusloggen
        </p>
      </div>

      {/* Körpanel */}
      <div className="bg-white rounded-2xl shadow-sm border border-tee-sand p-6">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={18} className="text-tee-gold" />
              <h3 className="font-semibold text-tee-green">Manuell körning</h3>
            </div>
            <p className="text-sm text-tee-green/50 leading-relaxed">
              Söker igenom alla anslutna banor efter lediga tider och skapar eller
              uppdaterar last-minute-deals i realtid.
            </p>
          </div>
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-tee-green text-tee-gold hover:bg-tee-green-light transition font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {running ? (
              <><RefreshCw size={16} className="animate-spin" />Kör...</>
            ) : (
              <><Play size={16} />Kör SM-motor</>
            )}
          </button>
        </div>

        {runResult && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm flex items-center gap-2">
            <CheckCircle size={16} className="flex-shrink-0" />
            <span>
              {runResult.message}
              {runResult.deals_found !== undefined
                ? ` — ${runResult.deals_found} deals hittades`
                : ''}
            </span>
          </div>
        )}

        {runError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center gap-2">
            <XCircle size={16} className="flex-shrink-0" />
            <span>{runError}</span>
          </div>
        )}
      </div>

      {/* Logg */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-tee-green">Statuslogg</h3>
          <button
            onClick={loadLog}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-tee-sand text-tee-green hover:bg-tee-sand/40 transition text-sm font-medium"
          >
            <RefreshCw size={14} className={loadingLog ? 'animate-spin' : ''} />
            Uppdatera
          </button>
        </div>

        {loadingLog ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-tee-sand/40 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : log.length === 0 ? (
          <div className="text-center py-16 text-tee-green/40 bg-white rounded-2xl border border-tee-sand">
            <Zap size={36} className="mx-auto mb-3 opacity-20" />
            <p>Ingen logg tillgänglig</p>
          </div>
        ) : (
          <div className="space-y-2">
            {log.map(entry => (
              <div
                key={entry.id}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${statusRowCls(entry.status)}`}
              >
                {statusIcon(entry.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-tee-green">{entry.message}</p>
                  {entry.deals_found !== undefined && (
                    <p className="text-xs text-tee-green/50 mt-0.5">
                      {entry.deals_found} deals
                    </p>
                  )}
                </div>
                <time className="text-xs text-tee-green/40 flex-shrink-0 mt-0.5 whitespace-nowrap">
                  {new Date(entry.timestamp).toLocaleString('sv-SE')}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
