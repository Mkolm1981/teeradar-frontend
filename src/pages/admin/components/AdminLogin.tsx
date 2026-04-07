// src/pages/admin/components/AdminLogin.tsx
import { useState } from 'react';

interface Props { onLogin: (pw: string) => boolean; }

export default function AdminLogin({ onLogin }: Props) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(pw)) {
      setError('Fel lösenord');
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-tee-green flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-tee-green rounded-xl flex items-center justify-center">
            <i className="ri-shield-keyhole-line text-tee-gold text-xl" />
          </div>
          <div>
            <div className="font-serif font-bold text-tee-green text-xl">Tee<span className="text-tee-gold">Radar</span></div>
            <div className="text-xs text-gray-400">Administration</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Lösenord</label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError(''); }}
                className="flex-1 px-4 py-3 text-sm outline-none"
                placeholder="Ange lösenord"
                autoFocus
              />
              <button type="button" onClick={() => setShow(!show)}
                className="px-3 text-gray-400 hover:text-gray-600">
                <i className={`ri-${show ? 'eye-off' : 'eye'}-line`} />
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button type="submit"
            className="bg-tee-green text-white py-3 rounded-xl font-semibold text-sm hover:bg-tee-green/90 transition-colors">
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}
