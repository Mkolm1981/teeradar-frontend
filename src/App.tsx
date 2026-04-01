import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // If navigation carries a scrollTo target, let the target page handle it
    const s = state as { scrollTo?: string } | null;
    if (s?.scrollTo) return;

    // Otherwise always scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, state]);

  return null;
}

function App() {
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
