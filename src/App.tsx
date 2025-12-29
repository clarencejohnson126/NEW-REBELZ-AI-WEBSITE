import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Services from './sections/Services'
import Clientele from './sections/Clientele'
import About from './sections/About'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Clientele />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Analytics />
      </div>
    </BrowserRouter>
  )
}

export default App
