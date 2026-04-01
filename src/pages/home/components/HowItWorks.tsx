const steps = [
  {
    number: '01',
    icon: 'ri-search-eye-line',
    title: 'Sök ledig tid',
    description:
      'Välj destination, datum och antal spelare. Se direkt vilka tider som finns – inklusive exklusiva last minute-priser du inte hittar någon annanstans.',
  },
  {
    number: '02',
    icon: 'ri-flag-line',
    title: 'Välj starttid',
    description:
      'Jämför tider och priser i en vy. Välj det som passar – du ser direkt hur mycket du sparar jämfört med bokningspriset på banan.',
  },
  {
    number: '03',
    icon: 'ri-checkbox-circle-line',
    title: 'Betala och spela',
    description:
      'Betala enkelt med kort. Bekräftelse direkt i mobilen. Visa koden vid receptionen – spelklart.',
  },
];

export default function HowItWorks() {
  return (
    <section id="hur" className="py-24 bg-tee-green relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <div className="w-full h-full rounded-full border-4 border-tee-gold translate-x-1/3 -translate-y-1/3"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
        <div className="w-full h-full rounded-full border-4 border-tee-gold -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-tee-gold"></span>
            <span className="text-tee-gold text-sm font-semibold tracking-widest uppercase">Enkelt som en putt</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Hur det fungerar
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            Tre enkla steg från idé till avslag. Ingen registrering krävs för att se tillgängliga tider.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-px border-t-2 border-dashed border-tee-gold/30 z-0"></div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center group"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Number badge */}
              <div className="text-xs font-bold text-tee-gold/50 tracking-widest mb-4">{step.number}</div>

              {/* Icon circle */}
              <div className="w-20 h-20 rounded-full bg-tee-gold/10 border border-tee-gold/20 flex items-center justify-center mb-6 group-hover:bg-tee-gold/20 transition-colors duration-300 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className={`${step.icon} text-tee-gold text-3xl`}></i>
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#search"
            className="inline-flex items-center gap-2 bg-tee-gold text-tee-green px-8 py-4 rounded-lg font-bold text-base hover:bg-tee-gold-light transition-colors cursor-pointer whitespace-nowrap"
          >
            Sök starttider nu
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-base"></i>
            </span>
          </a>
          <p className="text-white/40 text-sm mt-3">Ingen registrering krävs</p>
        </div>
      </div>
    </section>
  );
}
