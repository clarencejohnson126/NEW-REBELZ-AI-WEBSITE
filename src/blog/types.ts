export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  language: 'de' | 'en'
  keywords: string[]
  tldr: string
  faq: { question: string; answer: string }[]
  content: () => JSX.Element
}
