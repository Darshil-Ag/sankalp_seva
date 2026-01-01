import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './EventDetailModal.module.css'

const EventDetailModal = ({ event, onClose }) => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]

  // Get event data based on language
  const getEventData = (eventId) => {
    if (eventId === 'gau-shala') {
      return t.eventModal.gauShala
    } else if (eventId === 'ladli-ghar') {
      return t.eventModal.ladliGhar
    }
    return null
  }

  const eventData = getEventData(event.id)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!eventData) return null

  const handleDonate = () => {
    onClose()
    navigate('/donate')
  }

  const handleKnowMore = () => {
    onClose()
    navigate(event.detailLink)
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label={t.common.close}
          >
            ×
          </button>

          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={styles.eventIcon}>{event.icon}</div>
            <h2 className={styles.modalTitle}>{eventData.title}</h2>
            <div className={styles.eventDateBadge}>
              <span className={styles.dateLabel}>{t.eventModal.next}</span>
              <span className={styles.dateValue}>{event.nextDate}</span>
            </div>
          </div>

          {/* Description */}
          <div className={styles.modalBody}>
            <p className={styles.modalDescription}>{eventData.description}</p>

            {/* Impact Points */}
            <div className={styles.impactSection}>
              <h3 className={styles.impactTitle}>{t.eventModal.impact}</h3>
              <ul className={styles.impactList}>
                {eventData.impact.map((point, index) => (
                  <li key={index} className={styles.impactItem}>
                    <span className={styles.impactIcon}>✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Gallery */}
            <div className={styles.gallerySection}>
              <div className={styles.galleryGrid}>
                {(event.id === 'gau-shala' 
                  ? ['/photo_1/IMG-20251227-WA0026.jpg', '/photo_1/IMG-20251227-WA0027.jpg', '/photo_1/IMG-20251227-WA0028.jpg']
                  : ['/photo_1/IMG-20251227-WA0032.jpg', '/photo_1/IMG-20251227-WA0033.jpg', '/photo_1/IMG-20251227-WA0034.jpg']
                ).map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <img
                      src={image}
                      alt={`${eventData.title} - Photo ${index + 1}`}
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.modalActions}>
            <button
              className={styles.donateButton}
              onClick={handleDonate}
            >
              {t.common.donate}
            </button>
            <button
              className={styles.knowMoreButton}
              onClick={handleKnowMore}
            >
              {t.common.knowMore}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EventDetailModal
