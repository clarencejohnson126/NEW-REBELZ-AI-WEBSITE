import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'
import FAQSection from '../components/FAQSection'

export default function FAQHomepage() {
  const { t } = useTranslation()

  const items = t('faq.items', { returnObjects: true }) as { question: string; answer: string }[]

  return (
    <section className="section">
      <div className="container-main">
        <SectionHeader number="06" titleKey="faq.sectionTitle" />
        <FAQSection
          title={t('faq.title')}
          description={t('faq.description')}
          items={items}
        />
      </div>
    </section>
  )
}
