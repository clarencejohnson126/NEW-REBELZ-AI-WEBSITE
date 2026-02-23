import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  items: FAQItem[]
  className?: string
}

/**
 * FAQSection Component with Schema.org FAQPage JSON-LD
 *
 * This component creates SEO-optimized FAQ sections with:
 * - Schema.org FAQPage structured data for search engines
 * - Accessible accordion UI
 * - AI-friendly markup for GEO optimization
 */
export default function FAQSection({
  title,
  description,
  items,
  className = ""
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Generate JSON-LD for this FAQ section
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section
      className={`py-12 ${className}`}
      aria-labelledby="faq-title"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        {title && <h2 id="faq-title" className="text-h2 text-white mb-4">{title}</h2>}
        {description && (
          <p className="text-body text-muted max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-lg overflow-hidden"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left bg-white/5 hover:bg-white/10 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span
                className="text-body font-medium text-white pr-4"
                itemProp="name"
              >
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div
                className="p-5 pt-0 text-body text-muted"
                itemProp="text"
              >
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
