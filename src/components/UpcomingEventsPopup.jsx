import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './UpcomingEventsPopup.module.css'

// Calculate next Thursday
const getNextThursday = () => {
  const today = new Date()
  const day = today.getDay() // Sunday = 0, Thursday = 4
  const diff = (4 + 7 - day) % 7 || 7 // Days until next Thursday
  const next = new Date(today)
  next.setDate(today.getDate() + diff)
  return next
}

// Calculate next Monday
const getNextMonday = () => {
  const today = new Date()
  const day = today.getDay() // Sunday = 0, Monday = 1
  const diff = (1 + 7 - day) % 7 || 7 // Days until next Monday
  const next = new Date(today)
  next.setDate(today.getDate() + diff)
  return next
}

// Format date for display
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const UpcomingEventsPopup = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  const nextThursday = useMemo(() => getNextThursday(), [])
  const nextMonday = useMemo(() => getNextMonday(), [])

  const initiatives = [
    {
      id: 'gau-shala',
      title: 'Gau Shala Sewa',
      nextDate: formatDate(nextThursday),
      description: 'Every Thursday, we provide gur (jaggery) and nutritious chara (fodder) to cows as part of our commitment to animal welfare and traditional values. Your support helps us maintain this weekly service.',
      donateLink: '/donate',
      detailLink: '/initiatives/gau-shala',
      icon: '🐄'
    },
    {
      id: 'ladli-ghar',
      title: 'Ladli Ghar Ajmer',
      nextDate: formatDate(nextMonday),
      description: 'Every Monday, we provide monthly essentials including stationery and edible items to the girls of Ladli Ghar, Ajmer. This ongoing support ensures their well-being, education, and dignity.',
      donateLink: '/donate',
      detailLink: '/initiatives/ladli-ghar',
      icon: '🏠'
    }
  ]

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className={styles.popupContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={styles.popupContent}>
          {/* Close button */}
          <button
            className={styles.closeButton}
            onClick={() => setIsVisible(false)}
            aria-label="Close popup"
          >
            ×
          </button>

          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.popupTitle}>Upcoming Initiatives</h2>
            <p className={styles.popupSubtitle}>
              Join us in making a difference through our recurring programs
            </p>
          </div>

          {/* Initiatives Grid */}
          <div className={styles.initiativesGrid}>
            {initiatives.map((initiative) => (
              <motion.div
                key={initiative.id}
                className={styles.initiativeCard}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.icon}>{initiative.icon}</span>
                  <h3 className={styles.cardTitle}>{initiative.title}</h3>
                </div>
                
                <div className={styles.cardDate}>
                  <span className={styles.dateLabel}>Next Event:</span>
                  <span className={styles.dateValue}>{initiative.nextDate}</span>
                </div>

                <p className={styles.cardDescription}>{initiative.description}</p>

                <div className={styles.cardActions}>
                  <Link
                    to={initiative.donateLink}
                    className={styles.donateButton}
                  >
                    Donate for this Cause
                  </Link>
                  <Link
                    to={initiative.detailLink}
                    className={styles.knowMoreButton}
                  >
                    Know More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UpcomingEventsPopup

