import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CourseDetail, Timeslot } from '../../../mocks/courseDetail';

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

interface Props { course: CourseDetail; }

// Regular (full-price) mock times shown in the calendar
const REGULAR_TIMES = [
  { time: '08:00', spots: 4 },
  { time: '08:30', spots: 2 },
  { time: '09:00', spots: 4 },
  { time: '09:30', spots: 0 },
  { time: '10:00', spots: 3 },
  { time: '10:30', spots: 4 },
  { time: '11:00', spots: 1 },
  { time: '12:00', spots: 4 },
  { time: '13:30', spots: 2 },
  { time: '15:00', spots: 4 },
  { time: '16:00', spots: 3 },
];

// Dates with availability (relative to today = 19 Mar 2026)
const AVAILABLE_DATES = new Set([19,20,21,22,24,25,27,28,29,31]);
const LAST_MINUTE_DATE = 19;

function TimeslotRow({ slot, courseSlug }: { slot: Timeslot; courseSlug: string }) {
  const navigate = useNavigate();
  return (
    <div className={`flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all ${
      slot.isLastMinute ? 'border-tee-gold/40 bg-tee-gold/5' : 'border-gray-100 bg-white'
    }`}>
      <div className="flex items-center gap-3">
        {slot.isLastMinute && (
          <span className="flex items-center gap-1 bg-tee-gold text-tee-green text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
            <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain flex-shrink-0" /> SISTA MINUTEN
          </span>
        )}
        <div className="flex items-center gap-1.5 text-tee-green font-semibold text-sm">
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-time-line text-sm" />
          </span>
          {slot.time}
        </div>
      </div>
      <div className="flex items-center gap-5">
        {slot.spotsLeft <= 3 && (
          <span className="text-xs font-semibold text-orange-500 whitespace-nowrap">
            {slot.spotsLeft} platser kvar
          </span>
        )}
        <div className="text-right">
          {slot.discount > 0 && (
            <p className="text-xs text-gray-400 line-through">€{slot.originalPrice}</p>
          )}
          <p className="font-bold text-tee-green text-sm">
            €{slot.discountedPrice} <span className="text-xs font-normal text-gray-400">/ spelare</span>
          </p>
        </div>
        <button
          onClick={() => navigate(`/boka/${slot.id}`)}
          className="bg-tee-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors cursor-pointer whitespace-nowrap"
        >
          Boka nu
        </button>
      </div>
    </div>
  );
}

/* ───── Booking calendar ───── */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const DAYS = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

function CalendarBooking({ course }: { course: CourseDetail }) {
  const navigate = useNavigate();
  const today = new Date(2026, 2, 19); // 19 Mar 2026
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(2); // 0-indexed = March
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const firstDay = new Date(viewYear, viewMonth, 1);
  // Monday-based: getDay() returns 0=Sun; shift so Mon=0
  const startDow = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isToday = (d: number) => viewYear === 2026 && viewMonth === 2 && d === 19;
  const isPast = (d: number) => {
    const dt = new Date(viewYear, viewMonth, d);
    return dt < today;
  };
  const hasSlots = (d: number) => {
    if (isPast(d)) return false;
    if (viewYear === 2026 && viewMonth === 2) return AVAILABLE_DATES.has(d);
    if (viewYear === 2026 && viewMonth === 3) return d % 3 !== 0; // most days in April
    return false;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isLastMinuteDate = viewYear === 2026 && viewMonth === 2 && selectedDate === LAST_MINUTE_DATE;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Calendar grid */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-gray-500 text-lg" />
          </button>
          <p className="font-semibold text-tee-green text-sm">
            {MONTHS[viewMonth]} {viewYear}
          </p>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-gray-500 text-lg" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs text-gray-400 font-semibold py-1">{d}</div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* Empty leading cells */}
          {Array.from({ length: startDow }).map((_, i) => (
            <div key={`e${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const past = isPast(d);
            const avail = hasSlots(d);
            const selected = selectedDate === d && viewYear === 2026 && viewMonth === viewMonth;
            const todayCell = isToday(d);
            return (
              <button
                key={d}
                disabled={past || !avail}
                onClick={() => setSelectedDate(d)}
                className={`relative flex flex-col items-center justify-center h-9 w-full rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${past ? 'text-gray-200 cursor-not-allowed' : ''}
                  ${!past && !avail ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${avail && !selected ? 'text-tee-green hover:bg-tee-green/10' : ''}
                  ${selected ? 'bg-tee-green text-white' : ''}
                  ${todayCell && !selected ? 'ring-2 ring-tee-gold ring-offset-1' : ''}`}
              >
                {d}
                {avail && !selected && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-tee-gold" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tee-gold" /> Lediga tider
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded flex items-center justify-center ring-2 ring-tee-gold" />
            Idag
          </div>
        </div>
      </div>

      {/* Time slots for selected date */}
      <div className="lg:col-span-3">
        {selectedDate === null ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
            <span className="w-14 h-14 flex items-center justify-center mb-4">
              <i className="ri-calendar-line text-5xl text-gray-200" />
            </span>
            <p className="text-sm font-medium text-gray-500">Välj ett datum i kalendern</p>
            <p className="text-xs mt-1">för att se tillgängliga starttider</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-tee-green">
                  {selectedDate} {MONTHS[viewMonth]} {viewYear}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{REGULAR_TIMES.filter(t => t.spots > 0).length} tider tillgängliga</p>
              </div>
              {isLastMinuteDate && (
                <span className="flex items-center gap-1.5 bg-tee-gold/10 text-tee-gold border border-tee-gold/30 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                  <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain flex-shrink-0" /> Sista minuten-priser tillgängliga!
                </span>
              )}
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {REGULAR_TIMES.map((slot) => (
                <div
                  key={slot.time}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                    ${slot.spots === 0
                      ? 'border-gray-100 bg-gray-50 opacity-50'
                      : 'border-gray-100 bg-white hover:border-tee-green/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-tee-green font-semibold text-sm">
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-time-line text-sm" />
                      </span>
                      {slot.time}
                    </div>
                    {slot.spots > 0 && slot.spots <= 2 && (
                      <span className="text-xs text-orange-500 font-semibold whitespace-nowrap">
                        {slot.spots} {slot.spots === 1 ? 'plats' : 'platser'} kvar
                      </span>
                    )}
                    {slot.spots === 0 && (
                      <span className="text-xs text-gray-400">Fullbokat</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-tee-green text-sm">
                        €{course.regularPrice ?? 130}{' '}
                        <span className="text-xs font-normal text-gray-400">/ spelare</span>
                      </p>
                    </div>
                    <button
                      disabled={slot.spots === 0}
                      onClick={() => navigate(`/boka/${selectedDate}`)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap
                        ${slot.spots === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-tee-green text-white hover:bg-opacity-90 cursor-pointer'}`}
                    >
                      {slot.spots === 0 ? 'Fullbokat' : 'Boka'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ───── Main export ───── */
export default function CourseTimeslots({ course }: Props) {
  const [activeSection, setActiveSection] = useState<'lastminute' | 'calendar'>('lastminute');
  const todaySlots = course.timeslots.today;
  const hasLastMinute = todaySlots.length > 0 || course.timeslots.tomorrow.filter(s => s.isLastMinute).length > 0;
  const allLastMinute = [
    ...course.timeslots.today,
    ...course.timeslots.tomorrow.filter(s => s.isLastMinute),
    ...course.timeslots.other.filter(s => s.isLastMinute),
  ];

  return (
    <section id="timeslots" className="py-10 bg-tee-sand/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section toggle */}
        <div className="flex items-center gap-3 mb-7">
          <button
            onClick={() => setActiveSection('lastminute')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap
              ${activeSection === 'lastminute'
                ? 'bg-tee-gold text-tee-green'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-tee-gold/40'}`}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain" />
            </span>
            Sista minuten
            {hasLastMinute && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeSection === 'lastminute' ? 'bg-tee-green text-tee-gold' : 'bg-tee-gold/20 text-tee-gold'}`}>
                {allLastMinute.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('calendar')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap
              ${activeSection === 'calendar'
                ? 'bg-tee-green text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-tee-green/30'}`}
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-calendar-line text-sm" />
            </span>
            Boka en tid
          </button>
        </div>

        {/* Last minute */}
        {activeSection === 'lastminute' && (
          <>
            {allLastMinute.length > 0 ? (
              <div className="space-y-2">
                {allLastMinute.map((slot) => (
                  <TimeslotRow key={slot.id} slot={slot} courseSlug={course.slug} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <span className="w-14 h-14 flex items-center justify-center mx-auto mb-3">
                  <img src={RADAR_PIN_URL} alt="radar" className="w-10 h-10 object-contain opacity-30" />
                </span>
                <p className="text-sm">Inga sista minuten-tider just nu</p>
                <button
                  onClick={() => setActiveSection('calendar')}
                  className="mt-3 text-tee-green text-sm underline cursor-pointer"
                >
                  Boka till ordinarie pris →
                </button>
              </div>
            )}
          </>
        )}

        {/* Calendar */}
        {activeSection === 'calendar' && (
          <CalendarBooking course={course} />
        )}
      </div>
    </section>
  );
}
