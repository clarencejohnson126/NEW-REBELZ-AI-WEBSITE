import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { handleCalendlyClick } from '../lib/calendly-tracking'

export default function KiCheckBadge() {
  const { t } = useTranslation()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isFlipped && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsDismissed(true)
            }}
            className="absolute -top-3 -right-3 z-10 w-7 h-7 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            aria-label={t('kiCheck.close')}
          >
            <X className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div
        className="relative w-[320px] cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT SIDE */}
          <div
            className="relative w-fit"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping opacity-20" />

            <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white text-background shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.25)] transition-shadow">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold leading-tight">
                  {t('kiCheck.badgeTitle')}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {t('kiCheck.badgeSubtitle')}
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 w-full"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="bg-surface border border-white/10 rounded-2xl p-5 shadow-[0_4px_32px_rgba(0,0,0,0.4)]">
              <h3 className="text-white font-semibold text-sm mb-3">
                {t('kiCheck.backTitle')}
              </h3>

              <ul className="space-y-2 mb-4">
                {(t('kiCheck.points', { returnObjects: true }) as string[]).map(
                  (point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  )
                )}
              </ul>

              <a
                href="https://calendly.com/clarencejohnson/rebelz-ai-schlachtplan-gesprach"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCalendlyClick(e)
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-background text-xs font-semibold hover:bg-white/90 transition-colors"
              >
                {t('kiCheck.cta')}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <p className="text-[10px] text-white/40 text-center mt-2">
                {t('kiCheck.note')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
