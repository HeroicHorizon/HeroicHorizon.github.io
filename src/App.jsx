import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <div className="grid-bg" />
      <div className="scanlines" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
