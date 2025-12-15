import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'

export default function Clientele() {
  const { t } = useTranslation()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const clientTypes = t('clientele.types', { returnObjects: true }) as Array<{
    title: string
    preview: string
    full: string
  }>

  const stats = t('clientele.stats', { returnObjects: true }) as Array<{
    value: string
    sub: string
  }>

  return (
    <section className="section bg-surface">
      <div className="container-main">
        <SectionHeader number="03" titleKey="clientele.sectionTitle" />

        <div className="max-w-4xl mx-auto">
          {/* Interactive cards - click to expand */}
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {clientTypes.map((type, index) => (
              <button
                key={type.title}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`card text-left transition-all duration-500 ${
                  expandedIndex === index ? 'md:col-span-2 bg-surface-hover' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-h4 text-white mb-2 group-hover:text-white transition-colors">
                      {type.title}
                    </p>
                    <p className={`text-body transition-all duration-500 ${
                      expandedIndex === index ? 'text-foreground' : 'text-muted'
                    }`}>
                      {expandedIndex === index ? type.full : type.preview}
                    </p>
                  </div>
                  <span
                    className={`text-muted transition-transform duration-300 flex-shrink-0 ${
                      expandedIndex === index ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* The reality statement - with typewriter effect hint */}
          <div className="bg-surface border border-border rounded-md p-10 md:p-12 group hover:border-border-light transition-colors">
            <blockquote className="font-serif text-h3 md:text-h2 text-foreground italic leading-relaxed mb-6">
              <span className="inline-block">"{t('clientele.quote').split('.')[0]}.</span>{' '}
              <span className="inline-block group-hover:text-white transition-colors duration-500">
                {t('clientele.quote').split('.').slice(1).join('.')}"
              </span>
            </blockquote>
            <p className="text-body text-muted group-hover:text-foreground transition-colors">
              {t('clientele.quoteFollowup')}
            </p>
          </div>

          {/* What AI is here - interactive stats */}
          <div className="mt-16 text-center">
            <p className="text-small text-muted uppercase tracking-wide mb-8">{t('clientele.whatAiMeans')}</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat, index) => (
                <div
                  key={stat.value}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className="cursor-default group"
                >
                  <p
                    className={`text-h3 font-semibold transition-all duration-500 ${
                      hoveredStat === index ? 'text-white scale-110' : 'text-foreground'
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className={`text-small transition-all duration-300 ${
                    hoveredStat === index ? 'text-foreground' : 'text-muted'
                  }`}>
                    {stat.sub}
                  </p>
                  {/* Hidden line that appears on hover */}
                  <div
                    className={`h-px bg-white/20 mt-2 transition-all duration-500 ${
                      hoveredStat === index ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Secret discovery */}
          <div className="mt-16 text-center">
            <p
              className="text-small text-muted/50 hover:text-muted cursor-default transition-colors inline-block"
              title="You found it."
            >
              ···
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
