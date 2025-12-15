import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InteractiveImage from '../components/InteractiveImage'
import SectionHeader from '../components/SectionHeader'

export default function About() {
  const { t } = useTranslation()
  const [revealedFacts, setRevealedFacts] = useState<number[]>([])

  const hiddenFacts = t('about.hiddenFacts', { returnObjects: true }) as string[]
  const traits = t('about.traits', { returnObjects: true }) as Array<{
    title: string
    desc: string
  }>

  const toggleFact = (index: number) => {
    setRevealedFacts(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="ueber-mich" className="section">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column with header and image */}
          <div>
            <SectionHeader number="04" titleKey="about.sectionTitle" />

            <InteractiveImage
              src="https://eoahpwciwttfavzpqfnz.supabase.co/storage/v1/object/sign/unrelated/66eaa144-20e3-4c56-961d-2d52e3d71863.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YmJlMzI3NC0xODJjLTRmZGUtODk2NC1hMTcxNzVmY2I1NGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnJlbGF0ZWQvNjZlYWExNDQtMjBlMy00YzU2LTk2MWQtMmQ1MmUzZDcxODYzLnBuZyIsImlhdCI6MTc2NTc3MDgwNywiZXhwIjoxOTU0OTg2ODA3fQ.khRldlIIHrRApYjPoN2rHWCC9IXvlaoOTzmKR1sEHsk"
              alt="Clarence - Founder of Rebelz AI"
              placeholder="Photo"
              aspectRatio="aspect-[4/5]"
              className="w-full"
              grayscaleOnIdle={true}
            />

            {/* Hidden discovery - click to reveal facts */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {hiddenFacts.map((fact, index) => (
                <button
                  key={index}
                  onClick={() => toggleFact(index)}
                  className={`p-4 rounded-md border text-left transition-all duration-500 group ${
                    revealedFacts.includes(index)
                      ? 'bg-surface border-border-light'
                      : 'bg-transparent border-border hover:border-border-light'
                  }`}
                >
                  <span
                    className={`text-small block transition-all duration-500 ${
                      revealedFacts.includes(index)
                        ? 'text-foreground'
                        : 'text-muted group-hover:text-foreground'
                    }`}
                  >
                    {revealedFacts.includes(index) ? fact : t('about.discover')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right column with content */}
          <div className="lg:pt-24">
            <h3 className="text-h3 text-white mb-8">
              {t('about.title')}
            </h3>

            <div className="space-y-6 text-body text-foreground">
              <p className="group cursor-default">
                <span className="group-hover:text-white transition-colors">{t('about.intro')}</span>{' '}
                {t('about.introFollow')}
              </p>
              <p>
                {t('about.p1')}
              </p>
              <p className="relative">
                {t('about.p2')}
                <span className="absolute -right-2 top-0 w-1 h-1 bg-white rounded-full animate-pulse-subtle" />
              </p>
              <p className="text-muted">
                {t('about.p3')}
              </p>
            </div>

            {/* What you get - interactive cards */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-h4 text-white mb-6">{t('about.workingWith')}</p>
              <div className="grid grid-cols-2 gap-4">
                {traits.map((item, index) => (
                  <div
                    key={item.title}
                    className="group p-4 rounded-md hover:bg-background transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <p className="text-white font-medium mb-1 group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </p>
                    <p className="text-small text-muted group-hover:text-foreground transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
