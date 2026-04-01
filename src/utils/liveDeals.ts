// ─────────────────────────────────────────────────────────────────
// TeeRadar – liveDeals.ts (uppdaterad)
// src/utils/liveDeals.ts
//
// Ersätter mock-logiken med riktiga API-anrop mot backend.
// Behåller samma interface så inga komponenter behöver ändras.
// ─────────────────────────────────────────────────────────────────

import { getDeals, type Deal } from '../api/client';

export interface LiveSlot {
  id: number;
  time: string;
  isNextDay: boolean;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  spotsLeft: number;
  minutesFromNow: number;
  // Extra fält för bokningsprocessen
  startFull?: string;
  gmTenant?: string;
  gmVersion?: string;
  gmIdType?: number;
  gmIdResource?: number;
}

// Cache deals i 60 sekunder så vi inte hammrar API:et
let dealsCache: Deal[] | null = null;
let dealsCacheTime = 0;
const CACHE_TTL = 60_000;

async function fetchDeals(): Promise<Deal[]> {
  const now = Date.now();
  if (dealsCache && now - dealsCacheTime < CACHE_TTL) return dealsCache;
  try {
    dealsCache = await getDeals();
    dealsCacheTime = now;
    return dealsCache;
  } catch {
    return dealsCache ?? [];
  }
}

function dealToSlot(deal: Deal): LiveSlot {
  const startTime = new Date(deal.start_time);
  const now = new Date();
  const minutesFromNow = Math.round((startTime.getTime() - now.getTime()) / 60000);
  const isNextDay = startTime.toDateString() !== now.toDateString();

  return {
    id: deal.id,
    time: startTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    isNextDay,
    originalPrice: deal.original_price,
    discountedPrice: deal.display_price,
    discount: deal.discount_percent,
    spotsLeft: deal.spots_left,
    minutesFromNow,
    startFull: deal.start_time,
  };
}

/** Returnerar om det finns aktiva deals just nu */
export function hasActiveDeals(): boolean {
  const h = new Date().getHours();
  // Mellan 17:00–20:00 inga deals (dagens slut, imorgons ej släppta)
  return !(h >= 17 && h < 20);
}

/** Hämtar top N live slots för hero-sektionen */
export async function getTopLiveSlotsAsync(count: number): Promise<Array<{
  slug: string;
  slot: LiveSlot;
  heroImage: string;
  courseName: string;
  courseLocation: string;
  holes: number;
  par: number;
}>> {
  const deals = await fetchDeals();
  return deals
    .filter(d => d.active)
    .map(d => ({
      slug: d.courses.slug,
      slot: dealToSlot(d),
      heroImage: d.courses.image,
      courseName: d.courses.name,
      courseLocation: d.courses.location,
      holes: d.courses.holes,
      par: d.courses.par,
    }))
    .sort((a, b) => a.slot.minutesFromNow - b.slot.minutesFromNow)
    .slice(0, count);
}

/** Synkron version (använder cache) – för bakåtkompatibilitet */
export function getTopLiveSlots(count: number): Array<{
  slug: string;
  slot: LiveSlot;
  heroImage: string;
  courseName: string;
  courseLocation: string;
  holes: number;
  par: number;
}> {
  if (!dealsCache) return [];
  return dealsCache
    .filter(d => d.active)
    .map(d => ({
      slug: d.courses.slug,
      slot: dealToSlot(d),
      heroImage: d.courses.image,
      courseName: d.courses.name,
      courseLocation: d.courses.location,
      holes: d.courses.holes,
      par: d.courses.par,
    }))
    .sort((a, b) => a.slot.minutesFromNow - b.slot.minutesFromNow)
    .slice(0, count);
}

/** Hämtar live info för en specifik bana */
export async function getCourseLiveInfoAsync(slug: string): Promise<{
  nextSlot: LiveSlot | null;
  allSlots: LiveSlot[];
}> {
  const deals = await fetchDeals();
  const slots = deals
    .filter(d => d.courses.slug === slug && d.active)
    .map(dealToSlot)
    .sort((a, b) => a.minutesFromNow - b.minutesFromNow);

  return { nextSlot: slots[0] ?? null, allSlots: slots };
}

/** Synkron version för bakåtkompatibilitet */
export function getCourseLiveInfo(slug: string): {
  nextSlot: LiveSlot | null;
  allSlots: LiveSlot[];
} {
  if (!dealsCache) return { nextSlot: null, allSlots: [] };
  const slots = dealsCache
    .filter(d => d.courses.slug === slug && d.active)
    .map(dealToSlot)
    .sort((a, b) => a.minutesFromNow - b.minutesFromNow);
  return { nextSlot: slots[0] ?? null, allSlots: slots };
}

/** Hitta ett specifikt slot via ID */
export function getSlotById(id: number): {
  slot: LiveSlot;
  courseName: string;
  courseLocation: string;
  heroImage: string;
  holes: number;
  par: number;
  slug: string;
} | null {
  if (!dealsCache) return null;
  const deal = dealsCache.find(d => d.id === id);
  if (!deal) return null;
  return {
    slot: dealToSlot(deal),
    courseName: deal.courses.name,
    courseLocation: deal.courses.location,
    heroImage: deal.courses.image,
    holes: deal.courses.holes,
    par: deal.courses.par,
    slug: deal.courses.slug,
  };
}

/** Initiera cache vid app-start */
export async function initDealsCache(): Promise<void> {
  await fetchDeals();
}
