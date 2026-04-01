import { allCourses } from '../mocks/allCourses';
import { mockCourses } from '../mocks/courseDetail';

export interface LiveSlot {
  id: number;
  time: string;
  isNextDay: boolean;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  spotsLeft: number;
  minutesFromNow: number;
}

// La Dama de Noche is a floodlit night course – operates until ~22:00
const NIGHT_COURSES = new Set(['la-dama-de-noche']);

// Synthetic tomorrow slots for courses not in mockCourses
const SYNTHETIC_TOMORROW: Record<string, Array<{ time: string; discount: number; spots: number }>> = {
  'marbella-golf-cc':    [{ time: '09:00', discount: 35, spots: 3 }, { time: '11:30', discount: 28, spots: 2 }, { time: '14:00', discount: 22, spots: 4 }],
  'guadalmina-golf':     [{ time: '08:30', discount: 30, spots: 2 }, { time: '10:30', discount: 25, spots: 3 }, { time: '14:30', discount: 20, spots: 2 }],
  'estepona-golf':       [{ time: '08:00', discount: 40, spots: 4 }, { time: '10:00', discount: 35, spots: 3 }, { time: '13:00', discount: 28, spots: 2 }, { time: '15:30', discount: 22, spots: 3 }],
  'san-roque-golf':      [{ time: '09:30', discount: 38, spots: 2 }, { time: '12:00', discount: 32, spots: 3 }, { time: '15:00', discount: 25, spots: 2 }],
  'torrequebrada-golf':  [{ time: '08:30', discount: 33, spots: 2 }, { time: '11:00', discount: 28, spots: 3 }, { time: '14:00', discount: 22, spots: 2 }],
  'la-dama-de-noche':    [{ time: '17:00', discount: 25, spots: 3 }, { time: '18:30', discount: 30, spots: 2 }, { time: '20:00', discount: 35, spots: 2 }, { time: '21:30', discount: 40, spots: 1 }],
};

// Synthetic today-relative offsets (minutes from now) for non-mockCourse slugs
const SYNTHETIC_TODAY_OFFSETS: Record<string, Array<{ offsetMinutes: number; discount: number; spots: number }>> = {
  'marbella-golf-cc':    [{ offsetMinutes: 90,  discount: 35, spots: 3 }, { offsetMinutes: 200, discount: 28, spots: 2 }],
  'guadalmina-golf':     [{ offsetMinutes: 75,  discount: 30, spots: 2 }, { offsetMinutes: 180, discount: 25, spots: 3 }],
  'estepona-golf':       [{ offsetMinutes: 60,  discount: 40, spots: 4 }, { offsetMinutes: 140, discount: 35, spots: 3 }, { offsetMinutes: 230, discount: 30, spots: 2 }],
  'san-roque-golf':      [{ offsetMinutes: 100, discount: 38, spots: 2 }, { offsetMinutes: 210, discount: 32, spots: 2 }],
  'torrequebrada-golf':  [{ offsetMinutes: 80,  discount: 33, spots: 2 }, { offsetMinutes: 160, discount: 28, spots: 3 }],
  'la-dama-de-noche':    [{ offsetMinutes: 50,  discount: 25, spots: 3 }, { offsetMinutes: 110, discount: 30, spots: 2 }, { offsetMinutes: 170, discount: 35, spots: 2 }],
};

function toTimeStr(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/** After 17:00 most Spanish courses stop new tee-offs (night courses until 22:00) */
function todayStillOpen(now: Date, isNight: boolean): boolean {
  const h = now.getHours();
  return isNight ? h < 21 : h < 17;
}

/** After 20:00 tonight's release has happened – show tomorrow's deals */
function tomorrowReleased(now: Date): boolean {
  return now.getHours() >= 20;
}

function slotsFromMockCourse(slug: string, now: Date): LiveSlot[] {
  const course = mockCourses[slug];
  if (!course) return [];

  const isNight = NIGHT_COURSES.has(slug);
  const released = tomorrowReleased(now);
  const openToday = todayStillOpen(now, isNight);
  const result: LiveSlot[] = [];

  if (openToday) {
    course.timeslots.today
      .filter(s => s.isLastMinute)
      .forEach(s => {
        const [h, m] = s.time.split(':').map(Number);
        const target = new Date(now);
        target.setHours(h, m, 0, 0);
        const minutesFromNow = Math.round((target.getTime() - now.getTime()) / 60000);
        if (minutesFromNow > 10) {
          result.push({ ...s, isNextDay: false, minutesFromNow });
        }
      });
  }

  if (released) {
    course.timeslots.tomorrow
      .filter(s => s.discount > 0 || s.isLastMinute)
      .forEach(s => {
        const [h, m] = s.time.split(':').map(Number);
        const target = new Date(now);
        target.setDate(target.getDate() + 1);
        target.setHours(h, m, 0, 0);
        const minutesFromNow = Math.round((target.getTime() - now.getTime()) / 60000);
        result.push({ ...s, isNextDay: true, isLastMinute: true, minutesFromNow });
      });
  }

  return result.sort((a, b) => a.minutesFromNow - b.minutesFromNow);
}

function syntheticSlots(slug: string, now: Date, fromPrice: number): LiveSlot[] {
  const isNight = NIGHT_COURSES.has(slug);
  const released = tomorrowReleased(now);
  const openToday = todayStillOpen(now, isNight);
  const idBase = (slug.charCodeAt(0) * 997 + slug.charCodeAt(1) * 31) % 9000 + 1000;
  const result: LiveSlot[] = [];

  if (openToday && SYNTHETIC_TODAY_OFFSETS[slug]) {
    SYNTHETIC_TODAY_OFFSETS[slug].forEach((cfg, i) => {
      const slotTime = new Date(now.getTime() + cfg.offsetMinutes * 60000);
      const maxHour = isNight ? 21 : 17;
      if (slotTime.getHours() >= maxHour) return;
      const originalPrice = fromPrice + 10;
      const discountedPrice = Math.round(originalPrice * (1 - cfg.discount / 100));
      result.push({
        id: idBase + i,
        time: toTimeStr(slotTime),
        isNextDay: false,
        originalPrice,
        discountedPrice,
        discount: cfg.discount,
        spotsLeft: cfg.spots,
        minutesFromNow: cfg.offsetMinutes,
      });
    });
  }

  if (released && SYNTHETIC_TOMORROW[slug]) {
    SYNTHETIC_TOMORROW[slug].forEach((cfg, i) => {
      const [h, m] = cfg.time.split(':').map(Number);
      const target = new Date(now);
      target.setDate(target.getDate() + 1);
      target.setHours(h, m, 0, 0);
      const minutesFromNow = Math.round((target.getTime() - now.getTime()) / 60000);
      const originalPrice = fromPrice + 10;
      const discountedPrice = Math.round(originalPrice * (1 - cfg.discount / 100));
      result.push({
        id: idBase + 50 + i,
        time: cfg.time,
        isNextDay: true,
        originalPrice,
        discountedPrice,
        discount: cfg.discount,
        spotsLeft: cfg.spots,
        minutesFromNow,
      });
    });
  }

  return result.sort((a, b) => a.minutesFromNow - b.minutesFromNow);
}

/** Get live slot info for a single course */
export function getCourseLiveInfo(slug: string): {
  nextSlot: LiveSlot | null;
  allSlots: LiveSlot[];
} {
  const now = new Date();
  const courseData = allCourses.find(c => c.slug === slug);
  let slots: LiveSlot[];

  if (mockCourses[slug]) {
    slots = slotsFromMockCourse(slug, now);
  } else if (courseData) {
    slots = syntheticSlots(slug, now, courseData.fromPrice);
  } else {
    slots = [];
  }

  return { nextSlot: slots[0] ?? null, allSlots: slots };
}

/** Get the top N nearest slots across all last-minute courses (for hero section) */
export function getTopLiveSlots(count: number): Array<{
  slug: string;
  slot: LiveSlot;
  heroImage: string;
  courseName: string;
  courseLocation: string;
  holes: number;
  par: number;
}> {
  const now = new Date();
  const all: Array<{
    slug: string;
    slot: LiveSlot;
    heroImage: string;
    courseName: string;
    courseLocation: string;
    holes: number;
    par: number;
  }> = [];

  allCourses
    .filter(c => c.hasLastMinute)
    .forEach(c => {
      const slots = mockCourses[c.slug]
        ? slotsFromMockCourse(c.slug, now)
        : syntheticSlots(c.slug, now, c.fromPrice);

      const heroImage = mockCourses[c.slug]?.heroImage ?? c.image;

      slots.forEach(slot => {
        all.push({
          slug: c.slug,
          slot,
          heroImage,
          courseName: c.name,
          courseLocation: c.location,
          holes: c.holes,
          par: c.par,
        });
      });
    });

  all.sort((a, b) => a.slot.minutesFromNow - b.slot.minutesFromNow);
  return all.slice(0, count);
}

/**
 * Returns whether there are active deals right now.
 * Between 17:00–20:00 there are no slots (today done, tomorrow not yet released).
 */
export function hasActiveDeals(): boolean {
  const h = new Date().getHours();
  return !(h >= 17 && h < 20);
}

/** Find a specific slot by ID across all live courses – used by BookingPage */
export function getSlotById(id: number): {
  slot: LiveSlot;
  courseName: string;
  courseLocation: string;
  heroImage: string;
  holes: number;
  par: number;
  slug: string;
} | null {
  const now = new Date();
  for (const c of allCourses.filter(c => c.hasLastMinute)) {
    const slots = mockCourses[c.slug]
      ? slotsFromMockCourse(c.slug, now)
      : syntheticSlots(c.slug, now, c.fromPrice);

    const found = slots.find(s => s.id === id);
    if (found) {
      const heroImage = mockCourses[c.slug]?.heroImage ?? c.image;
      return {
        slot: found,
        courseName: c.name,
        courseLocation: c.location,
        heroImage,
        holes: c.holes,
        par: c.par,
        slug: c.slug,
      };
    }
  }
  return null;
}
