// ─────────────────────────────────────────────────────────────────
// TeeRadar – API Client
// src/api/client.ts
//
// Byt ut VITE_API_URL i Vercel mot din Railway-URL
// ─────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function apiFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Typer ────────────────────────────────────────────────────────

export interface Course {
  id: number;
  slug: string;
  name: string;
  location: string;
  area: string;
  lat: number;
  lng: number;
  from_price: number;
  rating: number;
  reviews: number;
  holes: number;
  par: number;
  difficulty: string;
  has_last_minute: boolean;
  last_minute_from?: number;
  image: string;
  gm_version?: string;
  has_buggy: boolean;
  has_restaurant: boolean;
  has_pro_shop: boolean;
  has_driving_range: boolean;
  description?: string;
}

export interface Deal {
  id: number;
  course_id: number;
  start_time: string;
  display_price: number;
  original_price: number;
  discount_percent: number;
  spots_left: number;
  active: boolean;
  expires_at: string;
  courses: {
    name: string;
    slug: string;
    location: string;
    area: string;
    image: string;
    rating: number;
    holes: number;
    par: number;
  };
}

export interface SearchResult {
  id: string;
  course: string;
  location: string;
  area: string;
  image: string;
  rating: number;
  reviews: number;
  holes: number;
  par: number;
  difficulty: string;
  time: string;
  startFull: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  spotsLeft: number;
  isLastMinute: boolean;
  slug: string;
  _gmTenant?: string;
  _gmVersion?: string;
  _gmIdType?: number;
  _gmIdResource?: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  startFull: string;
  idType: number;
  idResource: number;
  price: number;
  displayPrice: number;
  originalPrice: number;
  discount: number;
  minSlots: number;
  maxSlots: number;
  spotsLeft: number;
  isLastMinute: boolean;
}

export interface HoldRequest {
  courseSlug: string;
  startFull: string;
  idType: number;
  idResource: number;
  gmTenant: string;
  gmVersion: string;
  players: number;
  playerNames: string[];
  homeClub?: string;
  email: string;
  displayPrice: number;
  originalPrice: number;
}

export interface HoldResponse {
  clientSecret: string;
  paymentIntentId: string;
  totalAmount: number;
  greenfeeTotal: number;
  serviceFeeTotal: number;
  expiresAt: string;
}

// ── API-funktioner ───────────────────────────────────────────────

export const getCourses = () =>
  apiFetch<Course[]>('/api/courses');

export const getCourse = (slug: string) =>
  apiFetch<Course>(`/api/courses/${slug}`);

export const getCourseTimes = (slug: string, date: string, players = 2) =>
  apiFetch<TimeSlot[]>(`/api/courses/${slug}/times?date=${date}&players=${players}`);

export const getDeals = () =>
  apiFetch<Deal[]>('/api/deals');

export const searchTimes = (params: { date: string; destination?: string; players?: number }) => {
  const q = new URLSearchParams({
    date: params.date,
    destination: params.destination || 'Alla',
    players: String(params.players || 2),
  });
  return apiFetch<SearchResult[]>(`/api/search?${q}`);
};

export const createHold = (data: HoldRequest) =>
  apiFetch<HoldResponse>('/api/bookings/hold', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const confirmBooking = (paymentIntentId: string) =>
  apiFetch<{ bookingRef: string; booking: Record<string, unknown> }>('/api/bookings/confirm', {
    method: 'POST',
    body: JSON.stringify({ paymentIntentId }),
  });

export const getBooking = (ref: string) =>
  apiFetch<Record<string, unknown>>(`/api/bookings/${ref}`);

export const subscribe = (email: string) =>
  apiFetch<{ success: boolean }>('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
