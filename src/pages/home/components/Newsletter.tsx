import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');

    try {
      const body = new URLSearchParams();
      body.append('email', email.trim());

      const res = await fetch('https://readdy.ai/api/form/d6thhlgq778icnc8upag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError('Något gick fel. Försök igen.');
      }
    } catch {
      setError('Något gick fel. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="prenumerera" className="py-24 bg-tee-sand relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <img
            src="https://readdy.ai/api/search-image?query=golf%20course%20sunset%20golden%20hour%20Costa%20del%20Sol%20Spain%20warm%20orange%20golden%20light%20silhouette%20trees%20fairway%20beautiful%20moody%20atmospheric%20warm%20tones%20abstract%20bokeh&width=800&height=600&seq=newsletter1&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-tee-sand via-tee-sand/60 to-transparent"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-tee-gold"></span>
            <span className="text-tee-gold text-sm font-semibold tracking-widest uppercase">Dagliga deals kl 20:00</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-tee-green leading-tight mb-5">
            Missa aldrig<br />kvällens golf-deals
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Varje kväll kl 20:00 mejlar vi dig kvällens bästa last-minute-priser på 
            Costa del Sols golfbanor. Bli bland de första att veta.
          </p>

          {/* Feature list */}
          <ul className="space-y-2 mb-8">
            {[
              'Exklusiva priser – syns bara i mejlet',
              'Inga spam, bara deals',
              'Avprenumerera när du vill',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="w-5 h-5 rounded-full bg-tee-green flex items-center justify-center flex-shrink-0">
                  <span className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-check-line text-xs text-white"></i>
                  </span>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              data-readdy-form
              id="newsletter-form"
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-gray-400 text-base"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="din@email.se"
                  className="flex-1 bg-transparent text-sm text-tee-green placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-tee-green text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-tee-green-light transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
              >
                {loading ? 'Skickar...' : 'Prenumerera gratis'}
              </button>
            </form>
          ) : (
            <div className="bg-tee-green/10 border border-tee-green/20 rounded-xl px-6 py-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-tee-green flex items-center justify-center flex-shrink-0">
                <span className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-check-line text-white text-base"></i>
                </span>
              </span>
              <div>
                <p className="text-tee-green font-semibold text-sm">Välkommen ombord!</p>
                <p className="text-gray-500 text-xs mt-0.5">Du får ditt första mejl ikväll kl 20:00.</p>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <p className="text-gray-400 text-xs mt-3">
            Vi delar aldrig din e-postadress med tredje part. Läs vår{' '}
            <a href="#footer" className="underline cursor-pointer">integritetspolicy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
