import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  noindex?: boolean
}

export default function SEO({ title, description, canonical, noindex = false }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    if (ogDescription) ogDescription.setAttribute('content', description)

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)
    if (twitterDescription) twitterDescription.setAttribute('content', description)

    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) {
      if (canonicalLink) {
        canonicalLink.href = canonical
      } else {
        canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonical
        document.head.appendChild(canonicalLink)
      }
    }

    // Update robots
    let robotsMeta = document.querySelector('meta[name="robots"]')
    if (noindex) {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'noindex, nofollow')
      } else {
        robotsMeta = document.createElement('meta')
        robotsMeta.setAttribute('name', 'robots')
        robotsMeta.setAttribute('content', 'noindex, nofollow')
        document.head.appendChild(robotsMeta)
      }
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow')
    }

    // Cleanup function to restore defaults when component unmounts
    return () => {
      document.title = 'Rebelz AI | KI-Implementierung für kleine Unternehmen'
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Rebelz AI - KI-Implementierung für kleine Unternehmen in Deutschland. WhatsApp Automatisierung, Sprach-Agenten, KI-Systeme. Eine Person. Echte Systeme. Messbare Ergebnisse.')
      }
    }
  }, [title, description, canonical, noindex])

  return null
}
