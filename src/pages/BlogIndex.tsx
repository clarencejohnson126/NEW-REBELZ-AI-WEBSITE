import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { posts } from '../blog'

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog | Rebelz AI – KI-Implementierung für Bau & KMU"
        description="Praxiswissen zu KI-Agenten, WhatsApp-Automatisierung und Dokumentenmanagement für Bauunternehmen und kleine Unternehmen in der DACH-Region."
        canonical="https://rebelzai.com/blog"
      />
      <div className="container-main py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="text-h1 text-white mb-4">Blog</h1>
        <p className="text-body text-muted mb-12 max-w-2xl">
          Praxiswissen zu KI-Implementierung, Automatisierung und digitaler Transformation
          für Bauunternehmen und kleine Unternehmen in der DACH-Region.
        </p>

        <div className="grid gap-8">
          {posts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block card-interactive p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-small text-muted">{post.date}</span>
                    <span className="text-small text-muted uppercase">{post.language === 'de' ? 'Deutsch' : 'English'}</span>
                  </div>
                  <h2 className="text-h3 text-white mb-3 group-hover:text-foreground transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-body text-muted line-clamp-2">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.keywords.slice(0, 3).map(kw => (
                      <span key={kw} className="text-xs text-muted bg-white/5 px-2 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted group-hover:text-white transition-colors flex-shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
