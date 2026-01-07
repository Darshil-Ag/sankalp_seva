import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import HeroSection from '../components/HeroSection'
import DonationSection from '../components/DonationSection'
import FocusAreas from '../components/FocusAreas'
import TrustIndicators from '../components/TrustIndicators'
import MembersSection from '../components/MembersSection'
import CowFeedingVideos from '../components/CowFeedingVideos'
import Chatbot from '../components/Chatbot'
import styles from './Home.module.css'

const Home = () => {
  const { language } = useLanguage()
  const t = translations[language].home

  useEffect(() => {
    document.title = language === 'en' 
      ? 'Home | Sankalp Sewa Sansthan Kishangarh'
      : 'होम | संकल्प सेवा संस्थान'
  }, [language])

  return (
    <div className={styles.home}>
      <HeroSection />
      <TrustIndicators />
      <MembersSection />
      <CowFeedingVideos />
      <FocusAreas />
      <DonationSection />
      <Chatbot />
      
      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.h2
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.readyToMakeDifference}
          </motion.h2>
          <motion.p
            className={styles.ctaText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.joinSupporters}
          </motion.p>
          <motion.div
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/donate" className="btn btn-primary">
              {t.donateNowBtn}
            </Link>
            <Link to="/get-involved" className="btn btn-secondary">
              {t.getInvolvedBtn}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

