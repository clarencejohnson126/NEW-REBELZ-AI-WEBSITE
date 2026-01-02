import { useState, useEffect, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LetterPosition {
  x: number
  y: number
  rotation: number
}

function AnimatedText({
  text,
  isAnimating,
  baseDelay = 0,
  letterDelay = 25,
  duration = 1800,
  spread = 800,
  className = ''
}: {
  text: string
  isAnimating: boolean
  baseDelay?: number
  letterDelay?: number
  duration?: number
  spread?: number
  className?: string
}) {
  const words = text.split(' ')

  // Generate random starting positions for each letter
  const letterPositions = useMemo(() => {
    return words.map(word =>
      word.split('').map(() => ({
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * (spread * 0.6),
        rotation: (Math.random() - 0.5) * 90,
      } as LetterPosition))
    )
  }, [words.join(''), spread])

  let globalLetterIndex = 0

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((word, wordIndex) => {
        const letters = word.split('')

        return (
          <span key={wordIndex} className="inline-flex mr-[0.3em]">
            {letters.map((letter, letterIndex) => {
              const pos = letterPositions[wordIndex]?.[letterIndex] || { x: 0, y: 0, rotation: 0 }
              const delay = baseDelay + globalLetterIndex * letterDelay
              globalLetterIndex++

              return (
                <span
                  key={letterIndex}
                  className="inline-block transition-all ease-out"
                  style={{
                    transitionDuration: `${duration}ms`,
                    transform: isAnimating
                      ? 'translate(0, 0) rotate(0deg)'
                      : `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
                    opacity: isAnimating ? 1 : 0,
                    transitionDelay: `${delay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {letter}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [key, setKey] = useState(0)
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

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsFadingOut(true)

      setTimeout(() => {
        setIsAnimating(false)

        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
          setKey((prev) => prev + 1)
          setIsFadingOut(false)

          setTimeout(() => {
            setIsAnimating(true)
          }, 200)
        }, 400)
      }, 600)
    }, 8000)

    return () => clearInterval(interval)
  }, [slides.length])

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return

    setIsFadingOut(true)

    setTimeout(() => {
      setIsAnimating(false)

      setTimeout(() => {
        setCurrentSlide(index)
        setKey((prev) => prev + 1)
        setIsFadingOut(false)

        setTimeout(() => {
          setIsAnimating(true)
        }, 200)
      }, 400)
    }, 600)
  }

  const currentImageDesktop = slides[currentSlide]?.imageDesktop
  const currentImageMobile = slides[currentSlide]?.imageMobile
  const currentImage = isMobile ? currentImageMobile : currentImageDesktop

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image for slides that have one */}
      {slides.map((slide, index) => {
        const slideImage = isMobile ? slide.imageMobile : slide.imageDesktop
        return (
          slideImage && (
            <div
              key={`bg-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 bg-black ${
                currentSlide === index && !isFadingOut ? 'opacity-100' : 'opacity-0'
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
        className={`absolute inset-0 bg-gradient-to-b from-background via-background to-surface/50 transition-opacity duration-1000 ${
          currentImage && !isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 opacity-[0.02] transition-opacity duration-1000 ${
          currentImage && !isFadingOut ? 'opacity-0' : 'opacity-[0.02]'
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
      <div className="container-main relative z-10 text-center max-w-5xl px-4 py-8 md:py-0">
        {/* Headline with letter animation */}
        <h1
          key={`headline-${key}`}
          className={`font-display text-2xl sm:text-3xl md:text-display text-white mb-6 md:mb-10 font-semibold leading-tight transition-opacity duration-700 ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <AnimatedText
            text={slides[currentSlide].headline}
            isAnimating={isAnimating}
            letterDelay={25}
            duration={1800}
            spread={800}
          />
        </h1>

        {/* Subtext - italic serif font with letter animation */}
        <div
          key={`subtext-${key}`}
          className={`font-serif italic text-2xl sm:text-3xl md:text-h2 text-muted max-w-3xl mx-auto mb-8 md:mb-12 transition-opacity duration-700 ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <AnimatedText
            text={slides[currentSlide].subtext}
            isAnimating={isAnimating}
            baseDelay={800}
            letterDelay={15}
            duration={1500}
            spread={500}
          />
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-[1500ms] ease-out ${
            isAnimating && !isFadingOut
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionDelay: isAnimating ? '2500ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
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
        className={`absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 transition-opacity duration-1000 hidden md:flex ${
          isAnimating && !isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '3000ms' }}
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-small">{t('hero.scroll')}</span>
          <div className="w-px h-8 bg-border animate-pulse" />
        </div>
      </div>
    </section>
  )
}
