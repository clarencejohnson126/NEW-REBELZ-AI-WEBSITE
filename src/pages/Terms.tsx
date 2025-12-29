import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Terms() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      <div className="container-main py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('legal.backToHome')}
        </Link>

        <h1 className="text-h1 text-white mb-8">{t('terms.title')}</h1>
        <p className="text-muted mb-8">{t('terms.lastUpdated')}: 29.12.2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          {/* Impressum Section */}
          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.impressum.title')}</h2>
            <p className="text-body text-muted">
              <strong>Clarence Johnson</strong><br />
              Johnson Services<br />
              George-Washington-Str. 219<br />
              68309 Mannheim<br />
              Deutschland<br /><br />
              E-Mail: thinkbig@rebelz-ai.com
            </p>
            <p className="text-body text-muted mt-4">
              {t('terms.impressum.taxInfo')}<br />
              {t('terms.impressum.vatId')}<br />
              {t('terms.impressum.taxOffice')}
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.disclaimer.title')}</h2>
            <p className="text-body text-muted">{t('terms.disclaimer.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.liability.title')}</h2>
            <p className="text-body text-muted">{t('terms.liability.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.links.title')}</h2>
            <p className="text-body text-muted">{t('terms.links.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.copyright.title')}</h2>
            <p className="text-body text-muted">{t('terms.copyright.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.services.title')}</h2>
            <p className="text-body text-muted">{t('terms.services.content')}</p>
          </section>

          <section>
            <h2 className="text-h3 text-white mb-4">{t('terms.jurisdiction.title')}</h2>
            <p className="text-body text-muted">{t('terms.jurisdiction.content')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
