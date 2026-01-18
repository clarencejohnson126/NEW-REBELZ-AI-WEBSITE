import { useState, useEffect, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const slides = useMemo(() => [
    {
      headline: t('hero.slides.0.headline'),
      subtext: t('hero.slides.0.subtext'),
      imageDesktop: 'https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/bc940551-8de1-4e2f-8144-805e453b39e3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvYmM5NDA1NTEtOGRlMS00ZTJmLTgxNDQtODA1ZTQ1M2IzOWUzLnBuZyIsImlhdCI6MTc2NjA4MjA4MywiZXhwIjoxOTU1Mjk4MDgzfQ.OSWxncfYvnS_xZfaoOmUYw92keXXkFVRbDp7sM09NBw',
      imageMobile: 'https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/office%20portrait.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvb2ZmaWNlIHBvcnRyYWl0LnBuZyIsImlhdCI6MTc2NjE3Mzk0NSwiZXhwIjoxOTU1Mzg5OTQ1fQ.r2ig5bOK5jNnoZl6KnBLSJtlhUA0JwhGmK58X4zfQOo',
    },
    {
      headline: t('hero.slides.1.headline'),
      subtext: t('hero.slides.1.subtext'),
      imageDesktop: 'https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/73c0496c-1f36-4fc2-a8c2-cce565fb2e03.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvNzNjMDQ5NmMtMWYzNi00ZmMyLWE4YzItY2NlNTY1ZmIyZTAzLnBuZyIsImlhdCI6MTc2NjA4MjMyNSwiZXhwIjoxOTU1Mjk4MzI1fQ.U4UN9HVb_SIpinFByn6OwRmjuPYxbmZ7aaPceJ5ED-c',
      imageMobile: 'https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/architect%20portrait.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvYXJjaGl0ZWN0IHBvcnRyYWl0LnBuZyIsImlhdCI6MTc2NjE3NDAwMywiZXhwIjoxOTU1MzkwMDAzfQ.fo7-BOcz7r1p862u_g-WfR3TJNElmimtrU3pWMubBl4',
    },
    {
      headline: t('hero.slides.2.headline'),
      subtext: t('hero.slides.2.subtext'),
      imageDesktop: 'https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/0fe683e3-7fe8-4553-9b82-0479a558c375.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvMGZlNjgzZTMtN2ZlOC00NTUzLTliODItMDQ3OWE1NThjMzc1LnBuZyIsImlhdCI6MTc2NTc5Mjk5NywiZXhwIjoxOTU1MDA4OTk3fQ.YItbjBmT8i-wZtmFernzXN1JgHNGKNqYJeDjHaryuAE',
      imageMobile: 'https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/barber%20consult%20portrait.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvYmFyYmVyIGNvbnN1bHQgcG9ydHJhaXQucG5nIiwiaWF0IjoxNzY2MTc0MDMzLCJleHAiOjE5NTUzOTAwMzN9.OelTUYubwmoB4QqpvZqRz9GYaD9KqWkw-jis_d1O9bc',
    },
  ], [t])

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-advance slides every 10 seconds with slide animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Start slide out to the right
      setIsSliding(true)

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsSliding(false)
      }, 700)
    }, 10000)

    return () => clearInterval(interval)
  }, [slides.length])

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return

    setIsSliding(true)

    setTimeout(() => {
      setCurrentSlide(index)
      setIsSliding(false)
    }, 700)
  }

  const currentImageDesktop = slides[currentSlide]?.imageDesktop
  const currentImageMobile = slides[currentSlide]?.imageMobile
  const currentImage = isMobile ? currentImageMobile : currentImageDesktop

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Gumroad button - top right */}
      <div className="absolute top-24 right-4 md:right-8 z-20">
        <a
          className="gumroad-button"
          href="https://rebelzai.gumroad.com/l/KI-Nachunternehmer"
        >
          E-Book Bau
        </a>
      </div>

      {/* Background image for slides that have one */}
      {slides.map((slide, index) => {
        const slideImage = isMobile ? slide.imageMobile : slide.imageDesktop
        return (
          slideImage && (
            <div
              key={`bg-${index}`}
              className={`absolute inset-0 transition-all duration-700 ease-in-out bg-black ${
                currentSlide === index
                  ? isSliding
                    ? 'translate-x-full opacity-0'
                    : 'translate-x-0 opacity-100'
                  : '-translate-x-full opacity-0'
              }`}
            >
              <img
                src={slideImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          )
        )
      })}

      {/* Background gradient (shows when no image) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-background via-background to-surface/50 transition-opacity duration-700 ${
          currentImage && !isSliding ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 opacity-[0.02] transition-opacity duration-700 ${
          currentImage && !isSliding ? 'opacity-0' : 'opacity-[0.02]'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-12 h-1 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-white' : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`container-main relative z-10 text-center max-w-5xl px-4 py-8 md:py-0 transition-all duration-700 ease-in-out ${
          isSliding ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-display text-white mb-6 md:mb-10 font-semibold leading-tight">
          {slides[currentSlide].headline}
        </h1>

        {/* Subtext - italic serif font, white */}
        <div className="font-serif italic text-2xl sm:text-3xl md:text-h2 text-white max-w-3xl mx-auto mb-8 md:mb-12">
          {slides[currentSlide].subtext}
        </div>

        {/* CTA */}
        <div>
          <a
            href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group inline-flex"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 transition-all duration-700 hidden md:flex ${
          isSliding ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-small">{t('hero.scroll')}</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
