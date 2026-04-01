import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopLiveSlots, hasActiveDeals, LiveSlot } from '../../../utils/liveDeals';

const pad = (n: number) => String(n).padStart(2, '0');

// ---------- countdown to deal-release (kl 20:00) ----------
function useDealCountdown() {
  const [t, setT] = useState({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(20, 0, 0, 0);
      if (now >= target) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      setT({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ---------- live countdown for a slot (handles next-day) ----------
function useLiveCountdown(time: string | null, isNextDay: boolean) {
  const calc = () => {
    if (!time) return { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
    const [h, m] = time.split(':').map(Number);
    const target = new Date();
    if (isNextDay) target.setDate(target.getDate() + 1);
    target.setHours(h, m, 0, 0);
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      totalSeconds: Math.floor(diff / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isNextDay]);
  return t;
}

const heroLocations = ['Costa del Sols', 'Marbellas', 'Esteponas', 'Málagas', 'Sotograndes', 'Benahavís'];

// ---- Upcoming small card ----
interface UpcomingItem {
  slug: string;
  slot: LiveSlot;
  courseName: string;
  courseLocation: string;
  heroImage: string;
}

function UpcomingCard({ item }: { item: UpcomingItem }) {
  const navigate = useNavigate();
  const tee = useLiveCountdown(item.slot.time, item.slot.isNextDay);

  const hours = tee.hours;
  const mins = tee.minutes % 60;
  const label = item.slot.isNextDay
    ? (hours > 0 ? `${hours}h ${pad(mins)}m` : `${pad(tee.minutes)}m`)
    : tee.totalSeconds > 0
      ? (hours > 0 ? `${hours}h ${pad(mins)}m` : `${pad(tee.minutes)}:${pad(tee.seconds)}`)
      : `kl ${item.slot.time}`;

  return (
    <button
      onClick={() => navigate(`/boka/${item.slot.id}`)}
      className="group flex items-center gap-4 bg-white/10 hover:bg-white/[0.18] backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all duration-300 cursor-pointer text-left w-full"
    >
      <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.heroImage}
          alt={item.courseName}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate leading-tight">{item.courseName}</p>
        <p className="text-white/60 text-xs mt-0.5">{item.courseLocation}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-tee-gold text-xs font-bold">
            {item.slot.isNextDay ? 'imorgon' : ''} kl {item.slot.time} · om {label}
          </span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-white/80 text-xs font-semibold">€{item.slot.discountedPrice}</span>
          <span className="text-white/40 text-xs line-through">€{item.slot.originalPrice}</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <span className="bg-tee-gold/20 border border-tee-gold/50 text-tee-gold text-xs font-bold px-2 py-1 rounded-lg">-{item.slot.discount}%</span>
      </div>
    </button>
  );
}

// ---- Featured deal card ----
function FeaturedDealCard() {
  const navigate = useNavigate();
  const countdown = useDealCountdown();

  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const activeDeals = hasActiveDeals();
  const topSlots = activeDeals ? getTopLiveSlots(3) : [];
  const featured = topSlots[0] ?? null;

  const tee = useLiveCountdown(featured?.slot.time ?? null, featured?.slot.isNextDay ?? false);
  const isUrgent = !featured?.slot.isNextDay && tee.minutes < 15 && tee.totalSeconds > 0;

  // Empty state: between 17:00–20:00 (no deals, waiting for release)
  if (!featured || !activeDeals) {
    return (
      <div
        className="w-full rounded-3xl p-px"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.1) 50%, rgba(255,255,255,0.05) 100%)',
          boxShadow: '0 0 48px rgba(212,175,55,0.12), 0 32px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div className="relative w-full rounded-[23px] overflow-hidden bg-black/40 backdrop-blur-sm">
          <div className="px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-tee-gold/50"></span>
                <span className="text-tee-gold/80 text-xs font-semibold tracking-widest uppercase">Dagens tider är slut</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                Nya sista minuten-tider<br />släpps kl 20:00
              </h2>
              <p className="text-white/55 text-sm max-w-sm leading-relaxed">
                Varje kväll kl 20:00 släpper vi exklusiva rabatterade tider för imorgon. Prenumerera så missar du aldrig.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <p className="text-white/50 text-xs uppercase tracking-wider">Nytt släpp om</p>
              <div className="font-mono text-5xl md:text-6xl font-black text-white leading-none tabular-nums">
                {pad(countdown.hours)}<span className="text-3xl opacity-40 mx-1">:</span>{pad(countdown.minutes)}<span className="text-3xl opacity-40 mx-1">:</span>{pad(countdown.seconds)}
              </div>
              <a
                href="#prenumerera"
                className="mt-1 inline-flex items-center gap-2 bg-tee-gold text-tee-green px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-tee-gold-light transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line text-sm"></i>
                </span>
                Avisera mig kl 20:00
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isNextDay = featured.slot.isNextDay;

  return (
    <div
      className="w-full rounded-3xl p-px"
      style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.7) 0%, rgba(212,175,55,0.2) 50%, rgba(255,255,255,0.08) 100%)',
        boxShadow: '0 0 48px rgba(212,175,55,0.18), 0 32px 64px rgba(0,0,0,0.55)',
      }}
    >
      <div className="relative w-full rounded-[23px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={featured.heroImage} alt={featured.courseName} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"></div>
        </div>

        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-h-[220px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isUrgent ? 'bg-red-500/20 border-red-400/60 text-red-300' : 'bg-tee-gold/20 border-tee-gold/50 text-tee-gold'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isUrgent ? 'bg-red-400' : 'bg-tee-gold'} animate-pulse`}></span>
                {isNextDay ? 'PRECIS SLÄPPT – IMORGON' : 'NÄSTA LEDIGA TID'}
              </span>
              <span className="bg-tee-green/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                -{featured.slot.discount}%
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight mb-1">{featured.courseName}</h2>
            <div className="flex items-center gap-1.5 text-white/70 text-sm mb-5">
              <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-line text-sm"></i>
              </span>
              {featured.courseLocation}, Costa del Sol · {featured.holes} hål, par {featured.par}
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {/* Tee time + countdown */}
              <div>
                <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">
                  {isNextDay ? 'Imorgon kl' : 'Starttid kl'} <strong className="text-white/80">{featured.slot.time}</strong> · om
                </p>
                {isNextDay ? (
                  <div className="font-mono text-4xl md:text-5xl font-black leading-none text-tee-gold">
                    {pad(tee.hours)}<span className="text-2xl opacity-70">h</span>{pad(tee.minutes)}<span className="text-2xl opacity-70">m</span>
                  </div>
                ) : (
                  <div className={`font-mono text-4xl md:text-5xl font-black leading-none ${isUrgent ? 'text-red-400' : 'text-white'}`}>
                    {pad(tee.minutes)}<span className="text-2xl opacity-70">:</span>{pad(tee.seconds)}
                    <span className="text-base font-normal ml-1 text-white/50">min</span>
                  </div>
                )}
              </div>

              <div className="w-px h-12 bg-white/20 hidden md:block"></div>

              {/* Price */}
              <div>
                <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">Sista minuten – per spelare</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-tee-gold leading-none">€{featured.slot.discountedPrice}</span>
                  <span className="text-white/40 text-lg line-through">€{featured.slot.originalPrice}</span>
                </div>
              </div>

              {/* Spots */}
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-group-line text-white/70 text-sm"></i>
                </span>
                <div>
                  <p className="text-white text-sm font-semibold">{featured.slot.spotsLeft} platser kvar</p>
                  <p className="text-white/50 text-xs">på denna starttid</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate(`/boka/${featured.slot.id}`)}
              className={`px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shadow-lg ${isUrgent ? 'bg-red-500 hover:bg-red-400 text-white' : 'bg-tee-gold hover:bg-tee-gold-light text-tee-green'}`}
            >
              Boka nu →
            </button>
            <p className="text-white/40 text-xs text-center">Snabbt · Enkelt · Spelklart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSearch() {
  const [locationIndex, setLocationIndex] = useState(0);
  const [locationVisible, setLocationVisible] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    const locInterval = setInterval(() => {
      setLocationVisible(false);
      setTimeout(() => {
        setLocationIndex((prev) => (prev + 1) % heroLocations.length);
        setLocationVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(locInterval);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const active = hasActiveDeals();
  const upcomingRaw = active ? getTopLiveSlots(3).slice(1) : [];
  const upcomingSlots: UpcomingItem[] = upcomingRaw.map(r => ({
    slug: r.slug,
    slot: r.slot,
    courseName: r.courseName,
    courseLocation: r.courseLocation,
    heroImage: r.heroImage,
  }));

  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=aerial%20panoramic%20view%20of%20a%20stunning%20lush%20green%20golf%20course%20fairway%20on%20Costa%20del%20Sol%20Spain%20at%20golden%20sunset%20hour%20Mediterranean%20sea%20shimmering%20in%20the%20background%20warm%20golden%20orange%20light%20casting%20long%20dramatic%20shadows%20perfectly%20manicured%20green%20grass%20Spanish%20coastal%20landscape%20cinematic%20photography%20beautiful%20dramatic%20sky%20warm%20tones&width=1920&height=1080&seq=hero1&orientation=landscape"
          alt="Costa del Sol golfbana"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center pt-28 md:pt-40 pb-16">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-5">
          Sista minuten-tider på<br />
          <span
            className="text-tee-gold inline-block"
            style={{
              opacity: locationVisible ? 1 : 0,
              transform: locationVisible ? 'translateY(0px)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {heroLocations[locationIndex]}
          </span><br />
          bästa banor
        </h1>

        <p className="text-white/75 text-lg font-light max-w-xl mb-10 leading-relaxed">
          Boka exklusiva tee times till bättre pris – snabbt, enkelt och utan krångel.
        </p>

        <div className="w-full mb-4">
          <FeaturedDealCard />
        </div>

        {upcomingSlots.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {upcomingSlots.map((item) => (
              <UpcomingCard key={`${item.slug}-${item.slot.id}`} item={item} />
            ))}
          </div>
        )}

        <a
          href="#deals"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 text-sm transition-colors cursor-pointer"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-grid-line text-sm"></i>
          </span>
          Se alla dagens deals
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-down-line text-sm"></i>
          </span>
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-down-line text-white/40 text-xl"></i>
        </span>
      </div>
    </section>
  );
}
