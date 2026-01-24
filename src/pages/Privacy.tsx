import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

export default function Privacy() {
  const { t, i18n } = useTranslation()
  const isGerman = i18n.language === 'de'

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isGerman ? "Datenschutzerklärung | Rebelz AI" : "Privacy Policy | Rebelz AI"}
        description={isGerman
          ? "Datenschutzerklärung von Rebelz AI. Informationen zur Datenerhebung, Cookies und Ihren Rechten."
          : "Privacy Policy of Rebelz AI. Information about data collection, cookies, and your rights."
        }
        canonical="https://rebelzai.com/privacy"
      />
      <div className="container-main py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('legal.backToHome')}
        </Link>

        <h1 className="text-h1 text-white mb-8">{t('privacy.title')}</h1>
        <p className="text-muted mb-8">{t('privacy.lastUpdated')}: 29.12.2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.responsible.title')}</h2>
            <p className="text-body text-muted">
              Clarence Johnson<br />
              Johnson Services<br />
              George-Washington-Str. 219<br />
              68309 Mannheim<br />
              Deutschland<br /><br />
              E-Mail: thinkbig@rebelz-ai.com
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.overview.title')}</h2>
            <p className="text-body text-muted">{t('privacy.overview.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.dataCollection.title')}</h2>
            <p className="text-body text-muted mb-4">{t('privacy.dataCollection.intro')}</p>
            <ul className="list-disc list-inside text-body text-muted space-y-2">
              <li>{t('privacy.dataCollection.item1')}</li>
              <li>{t('privacy.dataCollection.item2')}</li>
              <li>{t('privacy.dataCollection.item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.contactForm.title')}</h2>
            <p className="text-body text-muted">{t('privacy.contactForm.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.cookies.title')}</h2>
            <p className="text-body text-muted">{t('privacy.cookies.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.analytics.title')}</h2>
            <p className="text-body text-muted">{t('privacy.analytics.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.rights.title')}</h2>
            <p className="text-body text-muted mb-4">{t('privacy.rights.intro')}</p>
            <ul className="list-disc list-inside text-body text-muted space-y-2">
              <li>{t('privacy.rights.item1')}</li>
              <li>{t('privacy.rights.item2')}</li>
              <li>{t('privacy.rights.item3')}</li>
              <li>{t('privacy.rights.item4')}</li>
              <li>{t('privacy.rights.item5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('privacy.contact.title')}</h2>
            <p className="text-body text-muted">
              {t('privacy.contact.content')}<br /><br />
              E-Mail: thinkbig@rebelz-ai.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
