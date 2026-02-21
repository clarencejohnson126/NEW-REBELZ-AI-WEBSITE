import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { handleCalendlyClick } from '../lib/calendly-tracking'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const currentLang = i18n.language.startsWith('de') ? 'de' : 'en'

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en'
    i18n.changeLanguage(newLang)
  }

  const navLinks = [
    { href: '#leistungen', label: t('nav.services') },
    { href: '#ueber-mich', label: t('nav.about') },
    { href: '#kontakt', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="px-4 md:px-8 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo - wrapper clips transparent padding from image */}
          <a
            href="#"
            className="flex items-start hover:opacity-80 transition-opacity flex-shrink-0 h-10 md:h-11 overflow-hidden"
          >
            <img
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/logos/ChatGPT%20Image%20Dec%2028,%202025,%2009_21_53%20PM%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9DaGF0R1BUIEltYWdlIERlYyAyOCwgMjAyNSwgMDlfMjFfNTMgUE0gKDEpLnBuZyIsImlhdCI6MTc2Njk1NDEwNSwiZXhwIjoxOTU2MTcwMTA1fQ.RO5Pa5bUuTuwTO5jcyRI5rKiPJJ7AFxX9OUMV2htrT4"
              alt="Rebelz AI"
              className="h-[173px] w-auto max-w-none -mt-[54px]"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
            <Link to="/blog" className="nav-link">
              {t('nav.blog')}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-muted hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-surface"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-small font-medium uppercase">{currentLang}</span>
            </button>

            <a
              href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
              onClick={handleCalendlyClick}
              className="btn-primary text-small py-3 px-6"
            >
              {t('nav.bookCall')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-muted hover:text-white transition-colors p-2"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-small font-medium uppercase">{currentLang}</span>
            </button>

            <button
              className="text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container-main py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="nav-link py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <a
              href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
              className="btn-primary text-center mt-4"
              onClick={(e) => { setIsMobileMenuOpen(false); handleCalendlyClick(e) }}
            >
              {t('nav.bookCall')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
