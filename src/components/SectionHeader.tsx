import { useTranslation } from 'react-i18next'

interface SectionHeaderProps {
  number: string
  titleKey: string
  className?: string
}

export default function SectionHeader({ number, titleKey, className = '' }: SectionHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className={`mb-16 ${className}`}>
      <span className="text-small text-muted tracking-widest">{number}</span>
      <h2 className="text-h2 md:text-display text-white mt-2 mb-6">
        {t(titleKey)}
      </h2>
      <div className="w-32 h-px bg-white/30" />
    </div>
  )
}
