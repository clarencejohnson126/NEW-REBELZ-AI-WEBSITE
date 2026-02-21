import { useState, useEffect } from 'react'
import { MessageSquare, Phone, Cpu, Smartphone, Globe, Wrench, FolderOpen, Handshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import ServiceModal from '../components/ServiceModal'
import SectionHeader from '../components/SectionHeader'

const serviceIcons = {
  whatsapp: MessageSquare,
  voice: Phone,
  'ai-systems': Cpu,
  mobile: Smartphone,
  web: Globe,
  tools: Wrench,
  'construction-files': FolderOpen,
  partner: Handshake,
}

const serviceIds = ['whatsapp', 'voice', 'ai-systems', 'mobile', 'web', 'tools', 'construction-files', 'partner'] as const

export default function Services() {
  const { t } = useTranslation()
  const location = useLocation()
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (location.hash === '#nachtragsagent') {
      setSelectedServiceId('ai-systems')
    }
  }, [location.hash])

  const getService = (id: string) => {
    const Icon = serviceIcons[id as keyof typeof serviceIcons]
    return {
      id,
      icon: Icon,
      title: t(`services.items.${id}.title`),
      summary: t(`services.items.${id}.summary`),
      description: t(`services.items.${id}.description`),
      whoFor: t(`services.items.${id}.whoFor`),
      problem: t(`services.items.${id}.problem`),
      solution: t(`services.items.${id}.solution`),
      whyCare: t(`services.items.${id}.whyCare`),
      features: t(`services.items.${id}.features`, { returnObjects: true }) as string[],
    }
  }

  const services = serviceIds.map(getService)
  const selectedService = selectedServiceId ? getService(selectedServiceId) : null

  return (
    <>
      <section id="leistungen" className="section">
        <div className="container-main">
          {/* Section header */}
          <SectionHeader number="02" titleKey="services.sectionTitle" />
          <p className="text-body text-muted max-w-2xl mb-12">
            {t('services.description')}
          </p>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="card-interactive text-left group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                {/* Badge for NachtragsAgent */}
                {service.id === 'ai-systems' && (
                  <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-white/10 text-white border border-white/20">
                    NEU: NachtragsAgent
                  </span>
                )}

                {/* Icon with float animation on hover */}
                <div className={`transition-transform duration-500 ${hoveredIndex === index ? 'animate-float' : ''}`}>
                  <service.icon className="w-8 h-8 text-muted mb-6 group-hover:text-foreground transition-colors duration-300" />
                </div>

                <h3 className="text-h4 text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-body-sm text-muted mb-6">{service.summary}</p>

                {/* Interactive hint */}
                <span className="inline-flex items-center gap-2 text-small text-muted group-hover:text-foreground transition-all duration-300">
                  <span className="w-0 group-hover:w-4 h-px bg-foreground transition-all duration-300" />
                  {t('services.explore')}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </span>
              </button>
            ))}
          </div>

          {/* Hidden discovery element */}
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                const randomId = serviceIds[Math.floor(Math.random() * serviceIds.length)]
                setSelectedServiceId(randomId)
              }}
              className="secret-door inline-block p-4 text-small text-muted hover:text-foreground transition-colors group"
            >
              <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                {t('services.notSure')}
              </span>
              <span className="block mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
                {t('services.discoverRandom')}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedServiceId(null)}
        service={selectedService}
      />
    </>
  )
}
