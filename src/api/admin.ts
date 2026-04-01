// ─────────────────────────────────────────────────────────────────
// TeeRadar – Admin API Client
// src/api/admin.ts
// ─────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';
const ADMIN_PASSWORD = 'TeeRadar2026!';

async function adminFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': ADMIN_PASSWORD,
      ...(opts?.headers as Record<string, string> | undefined),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Typer ────────────────────────────────────────────────────────

export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  activeCourses: number;
  subscribers: number;
  recentBookings: AdminBooking[];
}

export interface AdminBooking {
  id: number;
  booking_ref: string;
  course_name: string;
  course_slug?: string;
  start_time: string;
  players: number;
  total_amount: number;
  email: string;
  status: string;
  created_at: string;
}

export interface AdminSubscriber {
  id: number;
  email: string;
  created_at: string;
}

export interface SmLogEntry {
  id: number;
  timestamp: string;
  status: 'success' | 'error' | 'info';
  message: string;
  deals_found?: number;
}

export interface AdminCourse {
  id: number;
  slug: string;
  name: string;
  location: string;
  area: string;
  description?: string;
  image: string;
  active: boolean;
  from_price: number;
  rating: number;
  holes: number;
  par: number;
  gm_version?: string;
  has_buggy: boolean;
  has_restaurant: boolean;
  has_pro_shop: boolean;
  has_driving_range: boolean;
}

export interface CourseUpdateData {
  name?: string;
  description?: string;
  image?: string;
  active?: boolean;
  gm_version?: string;
  from_price?: number;
  has_buggy?: boolean;
  has_restaurant?: boolean;
  has_pro_shop?: boolean;
  has_driving_range?: boolean;
}

// ── API-funktioner ───────────────────────────────────────────────

export const getAdminStats = () =>
  adminFetch<AdminStats>('/api/admin/stats');

export const getAdminBookings = () =>
  adminFetch<AdminBooking[]>('/api/admin/bookings');

export const getAdminSubscribers = () =>
  adminFetch<AdminSubscriber[]>('/api/admin/subscribers');

export const getAdminCourses = () =>
  adminFetch<AdminCourse[]>('/api/admin/courses');

export const updateAdminCourse = (id: number, data: CourseUpdateData) =>
  adminFetch<AdminCourse>(`/api/admin/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const triggerSmMotor = () =>
  adminFetch<{ message: string; deals_found?: number }>('/api/admin/sm/run', {
    method: 'POST',
  });

export const getSmLog = () =>
  adminFetch<SmLogEntry[]>('/api/admin/sm/log');
