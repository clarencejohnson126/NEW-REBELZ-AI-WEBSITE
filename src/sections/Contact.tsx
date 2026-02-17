import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMessage(t('contact.form.errorMessage'))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="kontakt" className="section">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Content */}
          <div>
            <SectionHeader number="07" titleKey="contact.sectionTitle" />
            <p className="text-body text-muted mb-8">
              {t('contact.description')}
            </p>

            <div className="space-y-6 mb-12">
              <p className="text-body text-foreground">
                {t('contact.p1')}
              </p>
              <p className="text-body text-muted">
                {t('contact.p2')}
              </p>
            </div>

            {/* Direct booking */}
            <div className="p-8 bg-surface rounded-md border border-border">
              <p className="text-h4 text-white mb-4">
                {t('contact.scheduleTitle')}
              </p>
              <p className="text-body-sm text-muted mb-6">
                {t('contact.scheduleDesc')}
              </p>
              <a
                href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex group"
              >
                {t('nav.bookCall')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-body-sm text-foreground mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-body-sm text-foreground mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-body-sm text-foreground mb-2">
                  {t('contact.form.company')} <span className="text-muted">{t('contact.form.optional')}</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-body-sm text-foreground mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea"
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  t('contact.form.submit')
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 justify-center">
                  <CheckCircle className="w-5 h-5" />
                  <p>{t('contact.form.successMessage')}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 justify-center">
                  <AlertCircle className="w-5 h-5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <p className="text-small text-muted text-center">
                {t('contact.form.note')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
