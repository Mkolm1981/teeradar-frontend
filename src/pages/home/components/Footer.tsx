const footerLinks = {
  Tjänster: [
    { label: 'Sök starttider', href: '#search' },
    { label: 'Sista-minuten deals', href: '#deals' },
    { label: 'Bankatalog', href: '#banor' },
    { label: 'Dagliga deals via mejl', href: '#prenumerera' },
  ],
  Banor: [
    { label: 'Valderrama Golf Club', href: '#banor' },
    { label: 'Finca Cortesin', href: '#banor' },
    { label: 'Los Naranjos', href: '#banor' },
    { label: 'La Quinta Golf & CC', href: '#banor' },
    { label: 'Las Brisas', href: '#banor' },
  ],
  Kundservice: [
    { label: 'Hur det fungerar', href: '#hur' },
    { label: 'Vanliga frågor', href: '#hur' },
    { label: 'Kontakta oss', href: '#footer' },
    { label: 'Bokningspolicy', href: '#footer' },
    { label: 'Integritetspolicy', href: '#footer' },
  ],
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-tee-sand border-t border-tee-green/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <img
                src="https://static.readdy.ai/image/e0865fa40f6bd364ae465a899a6017bd/02b4b37886f15eea30efe7d41d1060dc.jpeg"
                alt="TeeRadar"
                className="h-9 w-auto rounded"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              TeeRadar – exklusiva last-minute starttider på Costa del Sols bästa golfbanor. 
              Varje kväll kl 20:00 släpper vi kvällens bästa deals.
            </p>
            {/* Contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line text-tee-gold text-sm"></i>
                </span>
                hej@teeradar.se
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-map-pin-line text-tee-gold text-sm"></i>
                </span>
                CMK AB · Costa del Sol, Spanien
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: 'ri-instagram-line', label: 'Instagram' },
                { icon: 'ri-facebook-circle-line', label: 'Facebook' },
                { icon: 'ri-twitter-x-line', label: 'X / Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#footer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-tee-green/10 flex items-center justify-center hover:bg-tee-green/20 transition-colors cursor-pointer"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className={`${s.icon} text-tee-green text-base`}></i>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-tee-green text-sm mb-4 tracking-wide uppercase">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 text-sm hover:text-tee-green transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-tee-green/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © 2024 CMK AB · Org.nr 556XXX-XXXX · Alla rättigheter förbehållna
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs">Säker betalning via:</span>
            <div className="flex items-center gap-2">
              {/* Visa */}
              <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-visa-line text-tee-green text-sm"></i>
                </span>
                <span className="text-xs font-bold text-tee-green">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5">
                <span className="text-xs font-bold text-gray-600">MC</span>
              </div>
              {/* Stripe */}
              <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-bank-card-line text-violet-600 text-sm"></i>
                </span>
                <span className="text-xs font-bold text-violet-600">Stripe</span>
              </div>
              {/* Swish */}
              <div className="bg-tee-green rounded-md px-3 py-1.5">
                <span className="text-xs font-bold text-white">Swish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
