/**
 * Calendly popup + Google Ads / GA4 conversion tracking.
 *
 * Replace the placeholder values before going live:
 *   GOOGLE_ADS_ID  = "AW-XXXXXXXXX"
 *   GOOGLE_ADS_LABEL = "YYYYYYYYYYYYYYYY"
 */

const CALENDLY_URL = 'https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach'
const GOOGLE_ADS_ID = 'AW-17968067129'
const GOOGLE_ADS_LABEL = '_VULCImgzFwbELnk6_dC'

const SESSION_KEY = 'calendlyBookedFired'

const isDebug = import.meta.env.VITE_DEBUG_TRACKING === 'true'

function debug(...args: unknown[]) {
  if (isDebug) console.log('[tracking]', ...args)
}

// ── Calendly popup ──────────────────────────────────────────────

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget(opts: { url: string }): void
    }
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function openCalendlyPopup() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    debug('Calendly popup opened')
  } else {
    // Fallback: open in new tab if widget script failed to load
    debug('Calendly widget not loaded, falling back to new tab')
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
  }
}

// ── CTA click tracking (GA4 only, not a primary conversion) ─────

export function trackCalendlyCtaClick() {
  if (window.gtag) {
    window.gtag('event', 'calendly_cta_click', {
      event_category: 'engagement',
      event_label: 'calendly_book_call',
    })
    debug('Fired GA4 event: calendly_cta_click')
  }
}

// ── Combined handler for Calendly CTA buttons ───────────────────

export function handleCalendlyClick(e: React.MouseEvent | MouseEvent) {
  e.preventDefault()
  trackCalendlyCtaClick()
  openCalendlyPopup()
}

// ── postMessage listener — fires conversion on booking ──────────

function isCalendlyEvent(data: unknown): data is { event: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'event' in data &&
    typeof (data as Record<string, unknown>).event === 'string'
  )
}

function handleMessage(e: MessageEvent) {
  // Only accept messages from Calendly origin
  if (!e.origin.includes('calendly.com')) return

  const data = e.data
  if (!isCalendlyEvent(data)) return

  debug('Calendly message received:', data.event)

  if (data.event === 'calendly.event_scheduled') {
    // Deduplicate: only fire once per session
    if (sessionStorage.getItem(SESSION_KEY)) {
      debug('Conversion already fired this session — skipping')
      return
    }
    sessionStorage.setItem(SESSION_KEY, '1')

    // Google Ads primary conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`,
        value: 1.0,
        currency: 'EUR',
      })
      debug('Fired Google Ads conversion:', `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`)
    }

    // GA4 event for reporting / debugging
    if (window.gtag) {
      window.gtag('event', 'calendly_event_scheduled', {
        event_category: 'conversion',
        event_label: 'booking_complete',
      })
      debug('Fired GA4 event: calendly_event_scheduled')
    }
  }
}

// ── Init / cleanup ──────────────────────────────────────────────

export function initCalendlyTracking() {
  window.addEventListener('message', handleMessage)
  debug('Calendly tracking listener initialized')
  return () => {
    window.removeEventListener('message', handleMessage)
    debug('Calendly tracking listener removed')
  }
}
