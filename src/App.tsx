import Header from './components/Header'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Services from './sections/Services'
import Clientele from './sections/Clientele'
import About from './sections/About'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  )
}

export default App
