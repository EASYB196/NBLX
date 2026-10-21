import React, { useEffect, useState } from 'react';
import { FaCookieBite, FaTimes, FaSlidersH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'nblx-cookie-consent';

const DEFAULT_PREFERENCES = {
  essential: true,
  analytics: false,
  marketing: false,
};

function readPreferences() {
  try {
    const saved = localStorage.getItem(CONSENT_KEY);

    if (!saved) return null;

    // Support consent choices saved by the previous version.
    if (saved === 'essential') {
      return { ...DEFAULT_PREFERENCES };
    }

    if (saved === 'all') {
      return {
        essential: true,
        analytics: true,
        marketing: true,
      };
    }

    const parsed = JSON.parse(saved);

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean'
    ) {
      return null;
    }

    return {
      essential: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
    };
  } catch {
    return null;
  }
}

function Cookies() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readPreferences();

    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }

    const openPreferences = () => {
      const current = readPreferences();

      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setShowPreferences(true);
    };

    window.addEventListener(
      'nblx-open-cookie-preferences',
      openPreferences
    );

    return () => {
      window.removeEventListener(
        'nblx-open-cookie-preferences',
        openPreferences
      );
    };
  }, []);

  const savePreferences = (preferences) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));

    setAnalytics(preferences.analytics);
    setMarketing(preferences.marketing);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptEssential = () => {
    savePreferences({ ...DEFAULT_PREFERENCES });
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences({
      essential: true,
      analytics,
      marketing,
    });
  };

  useEffect(() => {
    if (!showPreferences) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowPreferences(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showPreferences]);

  return (
    <>
      {/* Cookie consent banner */}
      {showBanner && (
        <section
          aria-label="Cookie consent"
          aria-describedby="cookie-description"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 lg:px-14">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black">
                <FaCookieBite size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold tracking-tight text-black sm:text-base">
                    Your privacy matters
                  </h2>

                  <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:inline-flex">
                    NBLX
                  </span>
                </div>

                <p
                  id="cookie-description"
                  className="mt-1 max-w-3xl text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6"
                >
                  We use essential cookies to keep our website working.
                  Optional cookies can help improve your experience when
                  permitted.
                  <Link
                    to="/cookies"
                    className="ml-1 font-semibold text-black underline underline-offset-2 transition hover:text-gray-500"
                  >
                    Learn more
                  </Link>
                </p>

                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-black underline underline-offset-4 transition hover:text-gray-500 sm:text-sm"
                >
                  <FaSlidersH size={12} />
                  Review cookie preferences
                </button>
              </div>

              <button
                type="button"
                onClick={acceptEssential}
                aria-label="Continue with essential cookies only"
                className="shrink-0 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={acceptEssential}
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:border-black hover:bg-gray-50 sm:w-auto sm:text-sm"
              >
                Essential only
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="w-full rounded-lg bg-black px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:w-auto sm:text-sm"
              >
                Accept all cookies
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Cookie preferences modal */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowPreferences(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                  <FaCookieBite size={19} />
                </div>

                <div>
                  <h2
                    id="cookie-preferences-title"
                    className="text-lg font-bold tracking-tight text-black sm:text-xl"
                  >
                    Cookie Preferences
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Choose which optional cookies NBLX may use.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label="Close cookie preferences"
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                <FaTimes size={15} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-7">
              {/* Essential cookies */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Essential cookies
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Support core functions such as security and shopping
                    features.
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-600">
                  Always active
                </span>
              </div>

              <div className="border-t border-gray-100" />

              {/* Analytics cookies */}
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Analytics cookies
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Help us understand how visitors use our website.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-black"
                />
              </label>

              <div className="border-t border-gray-100" />

              {/* Marketing cookies */}
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Marketing cookies
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Help measure advertising and promotional campaigns.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-black"
                />
              </label>

              <p className="rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                You can revisit these settings at any time through our Cookie
                Policy page. Optional tracking should only run when permitted
                by your saved preferences.
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={acceptEssential}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:border-black"
              >
                Essential only
              </button>

              <button
                type="button"
                onClick={saveCustomPreferences}
                className="rounded-lg border border-black bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Save preferences
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Accept all
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Cookies;