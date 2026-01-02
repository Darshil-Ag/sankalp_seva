import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './MembersSection.module.css'

const MembersSection = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const members = [
    {
      id: 1,
      src: '/members/megha agarwal.jpeg',
      name: 'Megha Agarwal',
      position: language === 'en' ? 'President' : 'अध्यक्ष'
    },
    {
      id: 2,
      src: '/members/anita chaparwal.jpeg',
      name: 'Anita Chhaparwal',
      position: language === 'en' ? 'Vice President' : 'उपाध्यक्ष'
    },
    {
      id: 3,
      src: '/members/anju agarwal.jpeg',
      name: 'Anju Agarwal',
      position: language === 'en' ? 'Secretary' : 'सचिव'
    },
    {
      id: 4,
      src: '/members/santosh agarwal.jpeg',
      name: 'Santosh Agarwal',
      position: language === 'en' ? 'Joint Secretary' : 'सहसचिव'
    },
    {
      id: 5,
      src: '/members/sunita khandelwal.jpeg',
      name: 'Sunita Khandelwal',
      position: language === 'en' ? 'Treasurer' : 'कोषाध्यक्ष'
    },
    {
      id: 6,
      src: '/members/ranjana bangar.jpeg',
      name: 'Ranjana Bangar',
      position: language === 'en' ? 'Member' : 'सदस्य'
    },
    {
      id: 7,
      src: '/members/vinita agarwal.jpeg',
      name: 'Vinita Agarwal',
      position: language === 'en' ? 'Member' : 'सदस्य'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const memberVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className={styles.membersSection} aria-label="Our Team" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {language === 'en' ? 'Our Dedicated Team' : 'हमारी समर्पित टीम'}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {language === 'en' 
            ? 'Meet the passionate individuals who drive our mission forward, working tirelessly to serve communities across Rajasthan.'
            : 'राजस्थान भर के समुदायों की सेवा करने के लिए अथक परिश्रम करने वाले उन भावुक व्यक्तियों से मिलें जो हमारे मिशन को आगे बढ़ाते हैं।'
          }
        </motion.p>
        <motion.div 
          className={styles.membersGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {members.map((member) => (
            <motion.div 
              key={member.id} 
              className={`${styles.memberCard} ${member.id === 1 ? styles.president : ''}`}
              variants={memberVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.memberImageContainer}>
                <motion.img
                  src={member.src}
                  alt={member.name}
                  className={styles.memberImage}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.position}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MembersSection

