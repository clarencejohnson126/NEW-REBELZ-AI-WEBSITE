interface TLDRBoxProps {
  title?: string
  children: React.ReactNode
  className?: string
}

/**
 * TLDRBox Component for GEO (Generative Engine Optimization)
 *
 * This component creates AI-friendly summaries that can be easily
 * extracted and cited by AI search engines like ChatGPT, Perplexity, and Bing Copilot.
 *
 * The content is marked with semantic HTML and data attributes to help AI
 * identify this as a key summary.
 */
export default function TLDRBox({ title = "Kurzfassung", children, className = "" }: TLDRBoxProps) {
  return (
    <aside
      className={`bg-white/5 border border-white/10 rounded-lg p-6 my-8 ${className}`}
      role="complementary"
      aria-label="Summary"
      data-ai-summary="true"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/60 bg-white/10 px-2 py-1 rounded">
          TL;DR
        </span>
        <h4 className="text-sm font-medium text-white/80">{title}</h4>
      </div>
      <div className="text-body text-white/70 leading-relaxed" data-summary-content="true">
        {children}
      </div>
    </aside>
  )
}
