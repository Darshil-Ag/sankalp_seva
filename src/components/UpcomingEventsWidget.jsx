import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import EventDetailModal from './EventDetailModal'
import styles from './UpcomingEventsWidget.module.css'

// Calculate next Thursday
const getNextThursday = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = (4 + 7 - day) % 7 || 7
  const next = new Date(today)
  next.setDate(today.getDate() + diff)
  return next
}

// Calculate next Monday
const getNextMonday = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = (1 + 7 - day) % 7 || 7
  const next = new Date(today)
  next.setDate(today.getDate() + diff)
  return next
}

// Format date for display
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}

const UpcomingEventsWidget = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { language } = useLanguage()
  const t = translations[language].upcomingEvents

  const nextThursday = useMemo(() => getNextThursday(), [])
  const nextMonday = useMemo(() => getNextMonday(), [])

  const events = [
    {
      id: 'gau-shala',
      title: t.gauShala,
      day: t.gauShalaDay,
      nextDate: formatDate(nextThursday),
      description: t.gauShalaDesc,
      detailLink: '/initiatives/gau-shala',
      icon: '🐄'
    },
    {
      id: 'ladli-ghar',
      title: t.ladliGhar,
      day: t.ladliGharDay,
      nextDate: formatDate(nextMonday),
      description: t.ladliGharDesc,
      detailLink: '/initiatives/ladli-ghar',
      icon: '🏠'
    }
  ]

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  return (
    <>
      <motion.div
        className={styles.widget}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>{t.title}</h3>
        </div>
        
        <div className={styles.eventsList}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className={styles.eventItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => handleEventClick(event)}
            >
              <div className={styles.eventIcon}>{event.icon}</div>
              <div className={styles.eventContent}>
                <div className={styles.eventTitleRow}>
                  <span className={styles.eventTitle}>{event.title}</span>
                  <span className={styles.eventDay}>{event.day}</span>
                </div>
                <div className={styles.eventDate}>{event.nextDate}</div>
              </div>
              <div className={styles.eventArrow}>→</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default UpcomingEventsWidget

