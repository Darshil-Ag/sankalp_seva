import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.nav 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      role="navigation" 
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <motion.img 
            src="/sankalp_logo.jpg" 
            alt="Sankalp Sewa Sansthan Kishangarh Logo"
            className={styles.logoImage}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className={styles.logoText}>Sankalp Sewa Sansthan Kishangarh</span>
        </Link>
        
        <div className={styles.navRight}>
          {/* Language Toggle */}
          <motion.button
            className={styles.languageToggle}
            onClick={toggleLanguage}
            aria-label="Toggle language"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className={styles.languageText}>
              {language === 'en' ? 'EN' : 'HI'}
            </span>
          </motion.button>

          <motion.button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className={styles.menuIcon}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              )}
            </motion.span>
          </motion.button>
        </div>

        <AnimatePresence>
          <motion.ul 
            className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}
            initial={false}
            animate={isMenuOpen ? { opacity: 1, height: "auto" } : {}}
          >
            {[
              { path: '/', label: t.nav.home },
              { path: '/about', label: t.nav.about },
              { path: '/programs', label: t.nav.programs },
              { path: '/gallery', label: t.nav.gallery },
              { path: '/contact', label: t.nav.contact },
              { path: '/donate', label: t.nav.donate, isCTA: true }
            ].map((item, index) => (
              <motion.li
                key={`${item.path}-${item.label}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`${isActive(item.path) && !item.isCTA ? styles.active : ''} ${item.isCTA ? styles.donateCTA : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
            {/* Language Toggle in Mobile Menu */}
            <li className={styles.mobileLanguageToggle}>
              <button
                className={styles.languageToggleMobile}
                onClick={() => {
                  toggleLanguage()
                  closeMenu()
                }}
              >
                <span>{language === 'en' ? 'EN' : 'HI'}</span>
              </button>
            </li>
          </motion.ul>
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
