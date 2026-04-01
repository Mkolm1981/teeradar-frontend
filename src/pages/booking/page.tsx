import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SiteNavbar from '../../components/feature/SiteNavbar';
import { getSlotById } from '../../utils/liveDeals';

const SERVICE_FEE_PER_PLAYER = 2.5;
const STEPS = ['Välj tid', 'Spelare', 'Kassa', 'Betala'];
const PLAYER_CODES = ['3W8JV', '4X9KQ', '7M2NR', 'K5PRT'];

const SWEDISH_CLUBS = [
  'Bro Hof Slott Golf Club',
  'Båstad Golf',
  'Falsterbo Golfklubb',
  'Gothenburg Golf Club',
  'Halmstad Golf Club',
  'Ljunghusen Golf Club',
  'Mölle Golf Club',
  'Österåkers Golf Club',
  'Royal Golf Club of Sweden',
  'Stockholms Golfklubb',
  'Sunne Golfklubb',
  'Täby Golfklubb',
  'Vasatorps Golfklubb',
  'Wermdö Golf &amp; Country Club',
];

interface CourseInfo {
  resort: string;
  name: string;
  time: string;
  date: string;
  dateLabel: string;
  includes: string;
  pricePerPlayer: number;
  originalPrice: number;
  discount: number;
}

interface PlayerData {
  name: string;
  hcp: string;
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2
                  ${done ? 'bg-tee-gold border-tee-gold text-white' : active ? 'bg-tee-gold border-tee-gold text-white' : 'bg-white border-gray-300 text-gray-400'}`}
              >
                {done ? <i className="ri-check-line text-sm" /> : n}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${active || done ? 'text-tee-green font-semibold' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-14 md:w-20 h-px mb-5 mx-1 ${done ? 'bg-tee-gold' : 'bg-gray-300'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CourseSummaryBar({ course, players }: { course: CourseInfo; players: number }) {
  const greenfee = course.pricePerPlayer * players;
  return (
    <div className="bg-tee-green rounded-xl px-5 py-4 flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg">
          <i className="ri-flag-2-line text-tee-gold text-lg" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{course.name}</p>
          <p className="text-white/60 text-xs">{course.time} · {course.dateLabel} · {course.includes}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-tee-gold font-bold text-xl">€{greenfee}</span>
        <p className="text-white/60 text-xs">{players} spelare × €{course.pricePerPlayer} <em>+ serviceavgift</em></p>
      </div>
    </div>
  );
}

function StepSpelare({ course, players, setPlayers, onNext, onBack }: {
  course: CourseInfo;
  players: number;
  setPlayers: (n: number) => void;
  onNext: (data: PlayerData[]) => void;
  onBack: () => void;
}) {
  const [playerData, setPlayerData] = useState<PlayerData[]>(
    Array.from({ length: 4 }, () => ({ name: '', hcp: '' }))
  );
  const [club, setClub] = useState('');

  const updatePlayer = (i: number, field: keyof PlayerData, val: string) => {
    const updated = [...playerData];
    updated[i] = { ...updated[i], [field]: val };
    setPlayerData(updated);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-tee-green mb-1">Ange spelarnas namn</h2>
      <p className="text-gray-400 text-sm mb-5">
        {course.resort} · {course.time} · {course.dateLabel}
      </p>

      <CourseSummaryBar course={course} players={players} />

      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-600">Antal spelare:</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setPlayers(n)}
              className={`w-10 h-10 rounded-full border-2 text-sm font-bold transition-all cursor-pointer whitespace-nowrap
                ${players === n ? 'bg-tee-green border-tee-green text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-tee-green/40'}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {Array.from({ length: players }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center rounded-xl border px-4 py-3 gap-4 ${i === 0 ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50/50'}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${i === 0 ? 'bg-tee-green' : 'bg-tee-green/70'}`}>
              {i + 1}
            </div>
            <input
              value={playerData[i].name}
              onChange={(e) => updatePlayer(i, 'name', e.target.value)}
              placeholder="Spelarens namn"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none"
            />
            <div className="w-5 h-5 flex items-center justify-center text-gray-300">
              <i className="ri-user-line text-base" />
            </div>
            <div className="w-px h-5 bg-gray-200" />
            <input
              value={playerData[i].hcp}
              onChange={(e) => updatePlayer(i, 'hcp', e.target.value)}
              placeholder="HCP"
              className="w-12 bg-transparent text-sm text-gray-400 placeholder-gray-300 focus:outline-none text-right"
            />
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
          Din hemmaklubb (valfritt)
        </label>
        <div className="relative">
          <select
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 bg-white appearance-none focus:outline-none focus:border-tee-gold cursor-pointer"
          >
            <option value="">Välj din golfklubb i Sverige...</option>
            {SWEDISH_CLUBS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-down-s-line text-gray-400 text-base" />
          </div>
        </div>
        {club && (
          <p className="text-xs text-tee-gold mt-1.5 flex items-center gap-1">
            <i className="ri-gift-line" /> {club} får 3% kickback på din bokning
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-500 text-sm font-semibold hover:border-gray-300 transition-colors cursor-pointer whitespace-nowrap"
        >
          Avbryt
        </button>
        <button
          onClick={() => onNext(playerData.slice(0, players))}
          className="flex-1 bg-tee-green text-white py-3 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors cursor-pointer whitespace-nowrap"
        >
          Fortsätt till kassa →
        </button>
      </div>
    </div>
  );
}

function StepKassa({ course, players, playerData, timeLeft, onNext, onBack }: {
  course: CourseInfo;
  players: number;
  playerData: PlayerData[];
  timeLeft: number;
  onNext: (email: string) => void;
  onBack: () => void;
}) {
  const [method, setMethod] = useState<'card' | 'swish' | 'apple'>('card');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [guestMode, setGuestMode] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const greenfee = course.pricePerPlayer * players;
  const serviceFee = SERVICE_FEE_PER_PLAYER * players;
  const total = greenfee + serviceFee;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div>
      <div className="bg-tee-green rounded-t-2xl px-8 py-6 flex items-center justify-between -mx-8 -mt-8 mb-8">
        <div>
          <h2 className="font-serif text-3xl font-bold text-white mb-1">Kassa</h2>
          <p className="text-white/60 text-sm">Du är ett steg från din starttid</p>
        </div>
        <button
          onClick={onBack}
          className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-left-line" /> Ändra
        </button>
      </div>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Din bokning</p>

          <div className="space-y-0 divide-y divide-gray-100">
            {Array.from({ length: players }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-4">
                <div className="w-6 h-6 flex items-center justify-center bg-tee-green rounded-md flex-shrink-0">
                  <i className="ri-check-line text-white text-xs" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {course.name} · Spelare {i + 1}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {course.resort} · {course.date} {course.time}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-mono rounded-md">
                    {PLAYER_CODES[i]}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {course.pricePerPlayer},00€
                </span>
                <button className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0">
                  <i className="ri-delete-bin-line text-sm" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Logga in eller fortsätt som gäst
            </p>

            {!guestMode ? (
              <>
                <div className="flex gap-3 mb-3">
                  <button className="flex-1 border-2 border-tee-green text-tee-green py-3 rounded-full text-sm font-semibold hover:bg-tee-green/5 transition-colors cursor-pointer whitespace-nowrap">
                    Logga in
                  </button>
                  <button
                    onClick={() => setGuestMode(true)}
                    className="flex-1 bg-tee-green text-white py-3 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Fortsätt som gäst
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Logga in för att spara dina bokningar och få notiser
                </p>
              </>
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  name="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="din@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tee-gold"
                />
                <input
                  type="tel"
                  placeholder="+46 70 000 00 00"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tee-gold"
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-amber-700 text-sm font-medium">
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-time-line text-base" />
              </span>
              Hold avslutas
            </div>
            <span className="text-tee-gold font-bold text-lg tabular-nums">
              {mins}:{secs.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="border border-gray-100 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800 text-sm">Sammanfattning</span>
              <button onClick={onBack} className="text-tee-green text-xs hover:underline cursor-pointer whitespace-nowrap">
                Ändra
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {Array.from({ length: players }).map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {playerData[i]?.name ? playerData[i].name : `Spelare ${i + 1}`}
                  </span>
                  <span className="text-gray-700 font-medium">{course.pricePerPlayer},00€</span>
                </div>
              ))}

              <div className="flex justify-between text-sm pt-2 mt-1 border-t border-gray-100">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-service-line text-gray-400 text-xs" />
                  </span>
                  Serviceavgift ({players} × €{SERVICE_FEE_PER_PLAYER.toFixed(2).replace('.', ',')})
                </span>
                <span className="text-gray-700 font-medium">
                  {serviceFee.toFixed(2).replace('.', ',')}€
                </span>
              </div>
            </div>

            <div className="flex gap-2 mb-5">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <i className="ri-price-tag-3-line text-gray-300 text-sm" />
                </span>
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Kampanjkod"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-tee-gold"
                />
              </div>
              {promo && (
                <button
                  onClick={() => setPromoApplied(true)}
                  className="px-4 py-2.5 bg-tee-green text-white rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  Använd
                </button>
              )}
            </div>

            {promoApplied && (
              <div className="flex justify-between text-green-600 text-sm mb-3">
                <span>Rabatt (kod)</span>
                <span>-€10</span>
              </div>
            )}

            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <span className="font-bold text-gray-800">Totalt</span>
              <span className="font-serif text-3xl font-bold text-tee-green">
                €{promoApplied ? (total - 10).toFixed(2).replace('.', ',') : total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Betalsätt</p>
            <div className="flex gap-2">
              {([
                ['card', 'Kort', 'ri-bank-card-line'],
                ['swish', 'Swish', 'ri-smartphone-line'],
                ['apple', 'Apple Pay', 'ri-apple-line'],
              ] as const).map(([k, l, ic]) => (
                <button
                  key={k}
                  onClick={() => setMethod(k)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap
                    ${method === k ? 'border-tee-green bg-tee-green/5 text-tee-green' : 'border-gray-200 text-gray-500 hover:border-tee-green/30'}`}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className={`${ic} text-sm`} />
                  </span>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNext(guestEmail)}
            className="w-full bg-tee-green text-white py-4 rounded-full text-base font-bold hover:bg-opacity-90 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 mb-3"
          >
            Betala &amp; bekräfta →
          </button>

          <p className="text-xs text-center text-amber-600 flex items-center justify-center gap-1 mb-2">
            <i className="ri-error-warning-line" />
            Håll upphör om {mins}:{secs.toString().padStart(2, '0')}
          </p>
          <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
            <i className="ri-lock-line" />
            Säker betalning · Fri avbokning 48h innan
          </p>
        </div>
      </div>
    </div>
  );
}

function StepConfirmation({ course, players, email }: { course: CourseInfo; players: number; email: string }) {
  const navigate = useNavigate();
  const greenfee = course.pricePerPlayer * players;
  const serviceFee = SERVICE_FEE_PER_PLAYER * players;
  const total = greenfee + serviceFee;

  return (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <span className="w-10 h-10 flex items-center justify-center">
          <i className="ri-check-line text-green-500 text-4xl" />
        </span>
      </div>
      <h2 className="font-serif text-3xl font-bold text-tee-green mb-2">Bokning bekräftad!</h2>
      <p className="text-gray-400 mb-8">Välkommen till {course.resort} – vi ses på banan!</p>

      <div className="border-2 border-tee-gold rounded-2xl p-6 mb-5 bg-tee-gold/5 text-center">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Din bokningskod</p>
        <p className="font-mono text-3xl font-bold text-tee-green tracking-widest">TR-2847-KL</p>
        <p className="text-xs text-gray-400 mt-2">Visa denna kod i receptionen</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 mb-5 text-left space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Bana</span>
          <span className="font-medium text-tee-green">{course.resort}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Datum</span>
          <span className="font-medium text-tee-green">{course.dateLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Starttid</span>
          <span className="font-medium text-tee-green">{course.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Spelare</span>
          <span className="font-medium text-tee-green">{players} st</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Greenfee</span>
          <span className="font-medium text-tee-green">€{greenfee.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Serviceavgift</span>
          <span className="font-medium text-tee-green">€{serviceFee.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-gray-200 pt-3">
          <span className="text-tee-green">Totalt betalt</span>
          <span className="text-tee-green">€{total.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5 flex items-center gap-3 text-left">
        <span className="text-2xl">☀️</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">Väderprognos för {course.dateLabel}</p>
          <p className="text-xs text-amber-600">24°C, lätt vind – perfekt golfväder!</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-6">Bekräftelse skickas till {email || 'din e-post'}</p>

      <div className="flex gap-3 mb-4">
        <button className="flex-1 border-2 border-tee-green/30 text-tee-green py-3 rounded-full text-sm font-semibold hover:bg-tee-green/5 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">
          <i className="ri-calendar-add-line" />Lägg till i kalender
        </button>
        <button
          onClick={() => navigate('/sok')}
          className="flex-1 bg-tee-green text-white py-3 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors cursor-pointer whitespace-nowrap"
        >
          Sök fler tider
        </button>
      </div>
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-400 hover:text-tee-green transition-colors cursor-pointer whitespace-nowrap"
      >
        Tillbaka till startsidan
      </button>
    </div>
  );
}

export default function BookingPage() {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();

  const resolvedData = bookingId ? getSlotById(Number(bookingId)) : null;

  const now = new Date();
  const isNextDay = resolvedData?.slot.isNextDay ?? false;
  const slotDate = isNextDay
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    : now;
  const dateStr = `${String(slotDate.getDate()).padStart(2, '0')}-${String(slotDate.getMonth() + 1).padStart(2, '0')}-${slotDate.getFullYear()}`;
  const dateLabel = slotDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

  const course: CourseInfo = {
    resort: resolvedData?.courseName ?? 'La Cala Golf Resort',
    name: resolvedData?.courseName ?? 'Campo America',
    time: resolvedData?.slot.time ?? '17:00',
    date: dateStr,
    dateLabel,
    includes: 'Shared Buggy inkl.',
    pricePerPlayer: resolvedData?.slot.discountedPrice ?? 85,
    originalPrice: resolvedData?.slot.originalPrice ?? 130,
    discount: resolvedData?.slot.discount ?? 35,
  };

  const [step, setStep] = useState(2);
  const [players, setPlayers] = useState(3);
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (step >= 5) return;
    const t = setInterval(() => setTimeLeft((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const displayStep = step === 5 ? 4 : Math.min(step, 4);
  const isKassa = step === 3;

  return (
    <main className="font-sans bg-[#F0F0EC] min-h-screen">
      <SiteNavbar />

      <div className={`mx-auto px-4 py-10 transition-all ${isKassa ? 'max-w-4xl' : 'max-w-2xl'}`}>
        {step < 5 && <StepIndicator step={displayStep} />}

        <div className="bg-white rounded-2xl p-8">
          {step === 2 && (
            <StepSpelare
              course={course}
              players={players}
              setPlayers={setPlayers}
              onNext={(data) => { setPlayerData(data); setStep(3); }}
              onBack={() => navigate('/sok')}
            />
          )}
          {step === 3 && (
            <StepKassa
              course={course}
              players={players}
              playerData={playerData}
              timeLeft={timeLeft}
              onNext={(e) => { setEmail(e); setStep(5); }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 5 && <StepConfirmation course={course} players={players} email={email} />}
        </div>

        {step < 5 && step !== 3 && (
          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
            <i className="ri-timer-line" />
            Din tid är reserverad i{' '}
            <span className="font-semibold text-orange-500">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </p>
        )}
      </div>
    </main>
  );
}
