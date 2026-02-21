import { useEffect, useRef } from 'react'
import { X, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { handleCalendlyClick } from '../lib/calendly-tracking'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    id: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    whoFor: string
    problem: string
    solution: string
    whyCare: string
    features: string[]
  } | null
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !service) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-lg shadow-2xl animate-modal-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-muted hover:text-white transition-colors z-10 group"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <service.icon className="w-12 h-12 text-muted mb-6 animate-float" />
            <h2 className="text-h2 text-white mb-4">{service.title}</h2>
            <p className="text-body text-foreground">{service.description}</p>
          </div>

          {/* Details grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <div className="group cursor-default">
                <p className="text-small text-muted uppercase tracking-wide mb-2 group-hover:text-foreground transition-colors">
                  {t('serviceModal.whoFor')}
                </p>
                <p className="text-body text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.whoFor}
                </p>
              </div>
              <div className="group cursor-default">
                <p className="text-small text-muted uppercase tracking-wide mb-2 group-hover:text-foreground transition-colors">
                  {t('serviceModal.problem')}
                </p>
                <p className="text-body text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.problem}
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="group cursor-default">
                <p className="text-small text-muted uppercase tracking-wide mb-2 group-hover:text-foreground transition-colors">
                  {t('serviceModal.solution')}
                </p>
                <p className="text-body text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.solution}
                </p>
              </div>
              <div className="group cursor-default">
                <p className="text-small text-muted uppercase tracking-wide mb-2 group-hover:text-foreground transition-colors">
                  {t('serviceModal.whyCare')}
                </p>
                <p className="text-body text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.whyCare}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="pt-8 border-t border-border">
            <p className="text-h4 text-white mb-6">{t('serviceModal.features')}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-background/50 rounded-md hover:bg-background transition-colors group cursor-default"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-2 h-2 rounded-full bg-muted group-hover:bg-white group-hover:scale-125 transition-all" />
                  <span className="text-body-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-body-sm text-muted">
              {service.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {service.id === 'ai-systems' && (
                <a
                  href="tel:+4915157731682"
                  className="inline-flex items-center gap-2 px-4 py-2 text-body-sm text-foreground border border-border rounded-md hover:bg-white/5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +49 151 5773 1682
                </a>
              )}
              <a
                href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
                onClick={handleCalendlyClick}
                className="btn-primary"
              >
                {t('serviceModal.cta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
