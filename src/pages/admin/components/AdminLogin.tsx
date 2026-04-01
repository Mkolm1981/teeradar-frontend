import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface Props {
  onLogin: (password: string) => boolean;
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = onLogin(password);
      if (!ok) {
        setError('Fel lösenord. Försök igen.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-tee-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-tee-green rounded-2xl mb-4 shadow-lg">
            <Lock className="w-7 h-7 text-tee-gold" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-tee-green">TeeRadar</h1>
          <p className="text-tee-green/50 mt-1 font-sans text-sm">Administrationspanel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-tee-sand">
          <h2 className="font-serif text-xl font-semibold text-tee-green mb-6">Logga in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-tee-green/70 mb-1.5">
                Lösenord
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-tee-sand bg-tee-white text-tee-green focus:outline-none focus:ring-2 focus:ring-tee-gold/50 focus:border-tee-gold transition pr-12 text-sm"
                  placeholder="••••••••••••"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tee-green/40 hover:text-tee-green/70 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-tee-green text-tee-gold font-semibold py-3 rounded-xl hover:bg-tee-green-light transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Kontrollerar...' : 'Logga in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
