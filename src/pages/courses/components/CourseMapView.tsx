import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CourseEntry } from '../../../mocks/allCourses';
import { unconnectedCourses } from '../../../mocks/unconnectedCourses';

interface Props {
  courses: CourseEntry[];
}

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

// Inject pulse keyframe once
function ensurePulseStyle() {
  const id = 'radar-pulse-css';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    @keyframes radarRing {
      0%   { transform: scale(1);   opacity: 0.55; }
      100% { transform: scale(2.6); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

export default function CourseMapView({ courses }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    ensurePulseStyle();
  }, []);

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [36.44, -5.0],
      zoom: 10,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync markers when courses change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // ── Connected courses (radar pulse / green flag pins) ──────────────────
    courses.forEach((course) => {
      const isLastMinute = course.hasLastMinute;
      const displayPrice = isLastMinute ? course.lastMinuteFrom : course.fromPrice;

      const icon = isLastMinute
        ? L.divIcon({
            className: '',
            html: `
              <div style="position:relative;width:42px;height:42px;cursor:pointer;">
                <div style="
                  position:absolute;inset:0;border-radius:50%;
                  background:#C9A84C;
                  animation:radarRing 2s ease-out infinite;
                  pointer-events:none;
                "></div>
                <div style="
                  position:absolute;inset:0;border-radius:50%;
                  background:#C9A84C;
                  animation:radarRing 2s ease-out infinite 0.75s;
                  pointer-events:none;
                "></div>
                <img src="${RADAR_PIN_URL}"
                     style="position:relative;z-index:2;width:42px;height:42px;object-fit:contain;" />
              </div>`,
            iconSize: [42, 42],
            iconAnchor: [21, 21],
            popupAnchor: [0, -26],
          })
        : L.divIcon({
            className: '',
            html: `<div style="
              width:34px;height:34px;border-radius:50%;
              background:#1a4a2e;
              border:3px solid white;
              box-shadow:0 2px 10px rgba(0,0,0,0.25);
              display:flex;align-items:center;justify-content:center;
              cursor:pointer;
            ">
              <i class="ri-flag-2-fill" style="color:white;font-size:14px"></i>
            </div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -22],
          });

      const popupContent = `
        <div style="width:200px;font-family:sans-serif;line-height:1.4">
          <div style="width:224px;height:110px;overflow:hidden;border-radius:6px 6px 0 0;margin:-8px -12px 10px -12px">
            <img src="${course.image}" alt="${course.name}"
                 style="width:100%;height:100%;object-fit:cover;object-position:top"/>
          </div>
          ${isLastMinute
            ? `<span style="display:inline-flex;align-items:center;gap:4px;background:#C9A84C;color:#1a4a2e;
                            font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:6px">
                 <img src="${RADAR_PIN_URL}" style="width:11px;height:11px;object-fit:contain" /> SISTA MINUTEN
               </span>`
            : ''}
          <strong style="display:block;color:#1a4a2e;font-size:13px;margin-bottom:2px">${course.name}</strong>
          <span style="color:#999;font-size:11px">${course.location}, Costa del Sol</span>
          <div style="margin-top:8px;display:flex;align-items:center;justify-content:space-between">
            <div>
              <span style="color:#aaa;font-size:10px">Från</span>
              <strong style="display:block;color:#1a4a2e;font-size:16px;line-height:1.1">
                €${displayPrice}
                <span style="font-size:11px;font-weight:400;color:#bbb">/sp</span>
              </strong>
            </div>
            <div style="display:flex;align-items:center;gap:3px">
              <i class="ri-star-fill" style="color:#C9A84C;font-size:12px"></i>
              <span style="font-size:12px;font-weight:700;color:#1a4a2e">${course.rating}</span>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker([course.lat, course.lng], { icon })
        .addTo(map)
        .bindPopup(popupContent, {
          closeButton: false,
          maxWidth: 224,
        });

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
      marker.on('click', () => navigate(`/banor/${course.slug}`));

      markersRef.current.push(marker);
    });

    // ── Unconnected courses (grey pins) ────────────────────────────────────
    unconnectedCourses.forEach((course) => {
      const greyIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:26px;height:26px;border-radius:50%;
          background:#c8c8c8;
          border:2.5px solid white;
          box-shadow:0 1px 6px rgba(0,0,0,0.18);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;
          opacity:0.85;
        ">
          <i class="ri-golf-ball-line" style="color:#888;font-size:11px"></i>
        </div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -18],
      });

      const popupContent = `
        <div style="width:210px;font-family:sans-serif;line-height:1.5">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
            <div style="width:28px;height:28px;border-radius:50%;background:#e8e8e8;
                        display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="ri-golf-ball-line" style="color:#aaa;font-size:13px"></i>
            </div>
            <strong style="color:#333;font-size:12px;line-height:1.3">${course.name}</strong>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:6px">
            <i class="ri-map-pin-line" style="color:#bbb;font-size:11px"></i>
            <span style="color:#aaa;font-size:11px">${course.location} &middot; ${course.holes} hål</span>
          </div>
          <p style="color:#666;font-size:11px;margin:0 0 10px 0;line-height:1.5">${course.description}</p>
          <div style="background:#f5f5f5;border-radius:6px;padding:7px 10px;display:flex;align-items:center;gap:6px">
            <i class="ri-information-line" style="color:#bbb;font-size:12px;flex-shrink:0"></i>
            <span style="color:#999;font-size:10px;line-height:1.4">Inte ansluten till TeeRadar ännu</span>
          </div>
        </div>
      `;

      const marker = L.marker([course.lat, course.lng], { icon: greyIcon })
        .addTo(map)
        .bindPopup(popupContent, { closeButton: false, maxWidth: 230 });

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());

      markersRef.current.push(marker);
    });

  }, [courses, navigate]);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col gap-2 pointer-events-none" style={{ boxShadow: 'none' }}>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Förklaring</p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <img src={RADAR_PIN_URL} alt="radar" className="h-6 w-auto object-contain" />
          </div>
          <span className="text-xs text-gray-600">Sista minuten-erbjudande</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-tee-green border-2 border-white flex items-center justify-center flex-shrink-0">
            <i className="ri-flag-2-fill text-white" style={{ fontSize: 9 }} />
          </div>
          <span className="text-xs text-gray-600">Bokningsbar på TeeRadar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#c8c8c8', border: '2px solid white' }}>
            <i className="ri-golf-ball-line" style={{ color: '#888', fontSize: 9 }} />
          </div>
          <span className="text-xs text-gray-500">Ej ansluten till TeeRadar</span>
        </div>
      </div>

      {/* Map */}
      <div ref={mapRef} style={{ height: '72vh', borderRadius: '16px' }} />

      <p className="text-center text-xs text-gray-400 mt-3">
        Hovra över en markör för info &middot; Klicka på grön/guld pin för att boka &middot; {unconnectedCourses.length + courses.length}+ banor synliga på kartan
      </p>
    </div>
  );
}
