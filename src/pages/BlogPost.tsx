import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { getPostBySlug } from '../blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const Content = post.content

  // Article JSON-LD schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://rebelzai.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rebelz AI",
      "url": "https://rebelzai.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rebelzai.com/blog/${post.slug}`
    },
    "keywords": post.keywords.join(', '),
    "inLanguage": post.language === 'de' ? 'de-DE' : 'en-US'
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} | Rebelz AI`}
        description={post.description}
        canonical={`https://rebelzai.com/blog/${post.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container-narrow py-12 md:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Alle Artikel
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-small text-muted">{post.date}</span>
            <span className="text-small text-muted">·</span>
            <span className="text-small text-muted">{post.author}</span>
            <span className="text-small text-muted">·</span>
            <span className="text-small text-muted uppercase">{post.language === 'de' ? 'Deutsch' : 'English'}</span>
          </div>
          <h1 className="text-h1 text-white mb-6">{post.title}</h1>
          <p className="text-body text-muted text-lg">{post.description}</p>
        </header>

        <Content />

        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-body text-muted mb-4">
            Geschrieben von <strong className="text-white">{post.author}</strong> · Rebelz AI
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Artikel ansehen
          </Link>
        </footer>
      </div>
    </div>
  )
}
