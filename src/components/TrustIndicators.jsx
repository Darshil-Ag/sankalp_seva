import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './TrustIndicators.module.css'

const TrustIndicators = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { language } = useLanguage()
  const t = translations[language].trust

  const indicators = [
    {
      icon: '📅',
      text: t.servingSince,
      subtext: t.establishedNGO
    },
    {
      icon: '🔄',
      text: t.weeklyMonthly,
      subtext: t.groundLevel
    },
    {
      icon: '🤝',
      text: t.communitySupported,
      subtext: t.transparent
    },
    {
      icon: '✅',
      text: t.registered,
      subtext: t.legal
    }
  ]

  return (
    <section className={styles.trustSection} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.indicatorsGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              className={styles.indicatorCard}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className={styles.indicatorIcon}>{indicator.icon}</div>
              <div className={styles.indicatorContent}>
                <div className={styles.indicatorText}>{indicator.text}</div>
                <div className={styles.indicatorSubtext}>{indicator.subtext}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustIndicators

