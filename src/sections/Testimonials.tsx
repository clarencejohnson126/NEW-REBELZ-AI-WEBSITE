import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'

export default function Testimonials() {
  const { t } = useTranslation()
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    industry: string
    company: string
    quote: string
    focus: string
    name: string
    role: string
    hidden: string
  }>

  return (
    <section className="section bg-surface">
      <div className="container-main">
        {/* Section header */}
        <SectionHeader number="05" titleKey="testimonials.sectionTitle" />
        <p className="text-body text-muted max-w-2xl mb-12">
          {t('testimonials.description')}
          <span className="text-muted/50 ml-2">{t('testimonials.clickToFlip')}</span>
        </p>

        {/* Testimonials grid - flip cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.company}
              className="relative h-[480px] cursor-pointer group perspective-1000"
              onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card container with 3D flip */}
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  flippedIndex === index ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0)',
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 bg-background border border-border rounded-md p-6 flex flex-col backface-hidden overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Industry tag */}
                  <span className="text-small text-muted mb-4 flex-shrink-0">{testimonial.industry}</span>

                  {/* Quote */}
                  <blockquote className="text-body-sm text-foreground mb-4 flex-grow overflow-hidden">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Focus area */}
                  <p className="text-small text-muted mb-4 pb-4 border-b border-border flex-shrink-0 line-clamp-2">
                    <span className="text-foreground">Focus:</span> {testimonial.focus}
                  </p>

                  {/* Attribution */}
                  <div className="flex-shrink-0">
                    <p className="text-body-sm text-white font-medium">{testimonial.name}</p>
                    <p className="text-small text-muted">{testimonial.role}, {testimonial.company}</p>
                  </div>

                  {/* Flip hint */}
                  <div
                    className={`absolute bottom-3 right-3 text-small text-muted transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {t('testimonials.flipHint')}
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 bg-background border border-border-light rounded-md p-6 flex flex-col items-center justify-center text-center backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <span className="text-small text-muted mb-4">{t('testimonials.keyMetric')}</span>
                  <p className="text-h4 md:text-h3 text-white font-semibold mb-4 break-words max-w-full px-2">{testimonial.hidden}</p>
                  <p className="text-body-sm text-muted">
                    {testimonial.company}
                  </p>
                  <div className="mt-6 text-small text-muted">
                    {t('testimonials.flipBack')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
