import type { BlogPost } from './types'
import kiAgentenBaubranche from './posts/ki-agenten-baubranche-2025'
import whatsappAutomatisierung from './posts/whatsapp-automatisierung-bauunternehmen'
import baustellenDokumentenmanagement from './posts/baustellen-dokumentenmanagement-ki'
import aiAgentsConstruction from './posts/ai-agents-construction-dach'
import kiImplementierung from './posts/ki-implementierung-kleine-unternehmen'

export const posts: BlogPost[] = [
  kiAgentenBaubranche,
  whatsappAutomatisierung,
  baustellenDokumentenmanagement,
  aiAgentsConstruction,
  kiImplementierung,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}
