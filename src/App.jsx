import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Impact from './pages/Impact'
import GetInvolved from './pages/GetInvolved'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Donate from "./pages/Donate"
import GauShalaDetail from './pages/GauShalaDetail'
import LadliGharDetail from './pages/LadliGharDetail'
import EventDetail from './pages/EventDetail'

function AppContent() {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/initiatives/gau-shala" element={<GauShalaDetail />} />
            <Route path="/initiatives/ladli-ghar" element={<LadliGharDetail />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  )
}

export default App

