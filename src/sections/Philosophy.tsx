import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

export default function Philosophy() {
  const { t } = useTranslation()

  const principles = t('philosophy.principles', { returnObjects: true }) as string[]

  return (
    <section className="section">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Section header */}
          <div>
            <SectionHeader number="01" titleKey="philosophy.title" />
          </div>

          {/* Right: Content */}
          <div className="lg:pt-8">
            <h3 className="text-h3 text-white mb-6">
              {t('philosophy.headline')}
            </h3>
            <p className="text-body text-muted mb-10 leading-relaxed">
              {t('philosophy.description')}
            </p>

            {/* Principles list */}
            <div className="space-y-5">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <p className="text-body text-muted">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
