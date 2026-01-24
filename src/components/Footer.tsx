import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Linkedin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [clickCount, setClickCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const footerLinks = [
    { href: '#leistungen', label: t('nav.services') },
    { href: '#ueber-mich', label: t('nav.about') },
    { href: '#kontakt', label: t('nav.contact') },
  ]

  const handleSecretClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    if (newCount >= 3) {
      setShowSecret(true)
    }
  }

  return (
    <footer className="border-t border-border">
      <div className="container-main py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="text-white font-semibold text-xl tracking-tight inline-block hover:scale-105 transition-transform"
            >
              Rebelz AI
            </a>
            <p className="text-body text-muted mt-6 max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-body-sm text-white font-medium mb-4">{t('footer.navigation')}</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body-sm text-muted hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-body-sm text-white font-medium mb-4">{t('footer.getInTouch')}</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:thinkbig@rebelz-ai.com"
                  className="text-body-sm text-muted hover:text-white transition-colors group"
                >
                  <span className="group-hover:underline">thinkbig@rebelz-ai.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-muted hover:text-white transition-colors"
                >
                  {t('nav.bookCall')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Closing statement */}
        <div className="py-12 border-t border-b border-border mb-12 group">
          <p className="font-serif text-h3 md:text-h2 text-foreground italic text-center max-w-2xl mx-auto group-hover:text-white transition-colors duration-500">
            "{t('footer.quote')}"
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/clarence-johnson-898b50a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://apps.apple.com/us/app/barberbuddyapp/id6749862156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-white transition-colors hover:opacity-80"
                title="BarberBuddy App"
              >
                <img
                  src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/BarberBudyyLogo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvQmFyYmVyQnVkeXlMb2dvLnBuZyIsImlhdCI6MTc2ODg2NDczNywiZXhwIjoxOTU4MDgwNzM3fQ.Ekl3H5wHUHFVP95W5Yv_YFIVZZJ3U1ioS-jhv_RS3FM"
                  alt="BarberBuddy"
                  className="w-[63px] h-[63px] object-contain"
                />
              </a>
              <a
                href="https://www.angebots-agent.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-white transition-colors hover:opacity-80 -ml-4"
                title="Angebots Agent"
              >
                <img
                  src="https://gxwzhgqeloqbgptrgcvo.supabase.co/storage/v1/object/public/all/original-53B10CB4-698B-4DCB-B4EA-F5B50A7EB370.jpeg"
                  alt="Angebots Agent"
                  className="w-[205px] h-[205px] object-contain"
                />
              </a>
              <a
                href="https://snapplan.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-white transition-colors hover:opacity-80 -ml-4"
                title="SnapPlan"
              >
                <img
                  src="https://gxwzhgqeloqbgptrgcvo.supabase.co/storage/v1/object/public/all/Adobe%20Express%20-%20file.png"
                  alt="SnapPlan"
                  className="w-[54px] h-[54px] object-contain"
                />
              </a>
              <a
                href="https://www.ki-bauunternehmer.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-white transition-colors hover:opacity-80"
                title="KI Bauunternehmer"
              >
                <img
                  src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/Adobe%20Express%20-%20file%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvQWRvYmUgRXhwcmVzcyAtIGZpbGUgKDMpLnBuZyIsImlhdCI6MTc2ODg2Mjk2OCwiZXhwIjoxOTU4MDc4OTY4fQ.wpOiKK_I4_W7VpTJaBumMvxAJw4TL-HgK90cilukNx4"
                  alt="KI Bauunternehmer"
                  className="w-[54px] h-[54px] object-contain"
                />
              </a>
            </div>
            <p className="text-small text-muted">
              © {currentYear} Rebelz AI. {t('footer.rights')}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-small text-muted hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-small text-muted hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
            {/* Secret easter egg */}
            <button
              onClick={handleSecretClick}
              className="text-small text-muted/30 hover:text-muted/50 transition-colors"
              title={showSecret ? 'Thanks for exploring!' : undefined}
            >
              ·
            </button>
          </div>
        </div>

        {/* Secret message */}
        <div
          className={`mt-8 text-center transition-all duration-1000 ${
            showSecret ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <p className="text-small text-muted/50 font-serif italic">
            "{t('footer.secretMessage')}"
          </p>
          <p className="text-small text-muted/30 mt-2">
            {t('footer.secretFollowup')}
          </p>
        </div>
      </div>
    </footer>
  )
}
