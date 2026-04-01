// src/App.tsx (uppdaterad – initierar deals-cache vid start)
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";
import { initDealsCache } from "./utils/liveDeals";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    const s = state as { scrollTo?: string } | null;
    if (s?.scrollTo) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, state]);
  return null;
}

function App() {
  useEffect(() => {
    initDealsCache();
    const interval = setInterval(initDealsCache, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
