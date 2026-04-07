// src/pages/admin/components/SettingsSection.tsx
import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';

interface SettingsGroup {
  title: string;
  icon: string;
  fields: { key: string; label: string; type?: string; placeholder?: string; hint?: string }[];
}

const GROUPS: SettingsGroup[] = [
  {
    title: 'Prissättning',
    icon: 'ri-money-euro-circle-line',
    fields: [
      { key: 'service_fee', label: 'Serviceavgift per spelare (€)', type: 'number', placeholder: '2.50', hint: 'Läggs på varje bokning per spelare' },
      { key: 'margin_percent', label: 'TeeRadar marginal (%)', type: 'number', placeholder: '20', hint: 'Procent av greenfee som är vår intäkt' },
      { key: 'kickback_default', label: 'Standard kickback (%)', type: 'number', placeholder: '30.00', hint: 'Procent av TeeRadars intäkt som går till hemmaklubb. Kan ha upp till 2 decimaler, t.ex. 2.75' },
    ]
  },
  {
    title: 'E-post (Resend)',
    icon: 'ri-mail-settings-line',
    fields: [
      { key: 'resend_api_key', label: 'Resend API-nyckel', type: 'password', placeholder: 're_...' },
      { key: 'email_from', label: 'Avsändaradress', placeholder: 'bokningar@teeradar.se' },
      { key: 'email_deals_time', label: 'Tid för deal-mejl', placeholder: '20:00', hint: 'Skickas automatiskt när SM-motorn kör' },
    ]
  },
  {
    title: 'Stripe (Kortbetalning)',
    icon: 'ri-bank-card-line',
    fields: [
      { key: 'stripe_publishable_key', label: 'Publishable Key', placeholder: 'pk_live_...' },
      { key: 'stripe_secret_key', label: 'Secret Key', type: 'password', placeholder: 'sk_live_...' },
      { key: 'stripe_webhook_secret', label: 'Webhook Secret', type: 'password', placeholder: 'whsec_...' },
    ]
  },
  {
    title: 'Swish (Sverige)',
    icon: 'ri-smartphone-line',
    fields: [
      { key: 'swish_number', label: 'Swish-nummer', placeholder: '123 456 78 90' },
      { key: 'swish_certificate', label: 'Certifikat (URL eller path)', placeholder: '/certs/swish.p12' },
      { key: 'swish_password', label: 'Certifikat-lösenord', type: 'password' },
    ]
  },
  {
    title: 'Vipps MobilePay (Norge/Danmark)',
    icon: 'ri-smartphone-line',
    fields: [
      { key: 'vipps_client_id', label: 'Client ID', placeholder: 'abc123...' },
      { key: 'vipps_client_secret', label: 'Client Secret', type: 'password' },
      { key: 'vipps_subscription_key', label: 'Subscription Key', type: 'password' },
      { key: 'vipps_merchant_serial', label: 'Merchant Serial Number', placeholder: '123456' },
      { key: 'vipps_test_mode', label: 'Testläge', type: 'checkbox', hint: 'Aktivera för att testa utan riktiga betalningar' },
    ]
  },
  {
    title: 'GolfManager (Standard)',
    icon: 'ri-settings-3-line',
    fields: [
      { key: 'gm_v1_base_url', label: 'V1 Base URL', placeholder: 'https://mt.golfmanager.app/api' },
      { key: 'gm_v3_base_url', label: 'V3 Base URL', placeholder: 'https://eu.golfmanager.com/api' },
      { key: 'gm_username', label: 'Användarnamn', placeholder: 'WBYXwaBaGN' },
      { key: 'gm_password', label: 'Lösenord', type: 'password' },
    ]
  },
  {
    title: 'SM-motor',
    icon: 'ri-timer-flash-line',
    fields: [
      { key: 'sm_run_time', label: 'Körningstid (HH:MM)', placeholder: '20:00', hint: 'Madrid-tid. Ändrar kräver omstart av backend.' },
      { key: 'sm_urgency_hours', label: 'Urgensy-rabatt (timmar innan teetid)', type: 'number', placeholder: '3', hint: 'Sänker priset ytterligare X timmar innan teetid' },
      { key: 'sm_urgency_discount', label: 'Urgensy-rabatt (%)', type: 'number', placeholder: '10', hint: 'Extra rabatt de sista X timmarna' },
    ]
  },
];

export default function SettingsSection() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = async (groupTitle: string) => {
    setSaved(groupTitle);
    // TODO: Spara till backend via /api/admin/settings
    // För nu visas bara en bekräftelse
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-tee-green">Inställningar</h1>
        <p className="text-gray-500 text-sm mt-1">Konfiguration för betalningar, e-post och integrationer</p>
      </div>

      <div className="flex flex-col gap-4">
        {GROUPS.map(group => (
          <div key={group.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <i className={`${group.icon} text-tee-green text-lg`} />
              <h2 className="font-semibold text-gray-900">{group.title}</h2>
            </div>
            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map(field => (
                <div key={field.key}>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                    {field.label}
                  </label>
                  {field.type === 'checkbox' ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox"
                        checked={!!values[field.key]}
                        onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.checked ? 'true' : '' }))}
                        className="accent-tee-green w-4 h-4" />
                      <span className="text-sm text-gray-600">{field.hint}</span>
                    </label>
                  ) : (
                    <>
                      <input
                        type={field.type || 'text'}
                        value={values[field.key] || ''}
                        onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold"
                      />
                      {field.hint && <p className="text-xs text-gray-400 mt-1">{field.hint}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-gray-50 flex justify-end">
              <button onClick={() => handleSave(group.title)}
                className="flex items-center gap-2 px-4 py-2 bg-tee-green text-white text-sm font-semibold rounded-xl hover:bg-tee-green/90">
                {saved === group.title ? (
                  <><i className="ri-check-line" /> Sparat!</>
                ) : 'Spara'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
        <strong>Obs:</strong> Känsliga uppgifter som API-nycklar lagras i Railway-miljövariabler, inte i databasen. Inställningssidan är förberedd för framtida implementation.
      </div>
    </div>
  );
}
