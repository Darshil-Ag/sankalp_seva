import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import UpcomingEventsWidget from './UpcomingEventsWidget'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  const { language } = useLanguage()
  const t = translations[language].home
  
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }


  const cards = [
    {
      id: 2,
      image: "/photo_1/IMG-20251227-WA0029.jpg",
      title: t.joinUs,
      description: t.cardJoinUs,
      buttonText: t.cardJoinVolunteer,
      link: "/get-involved",
      hasImage: true
    },
    {
      id: 1,
      image: "/photo_1/IMG-20251227-WA0030.jpg",
      title: t.donateNow,
      description: t.cardDonateNow,
      buttonText: t.donateNow,
      link: "/donate",
      hasImage: false
    },
    {
      id: 3,
      image: "/photo_1/IMG-20251227-WA0031.jpg",
      title: t.learnMore,
      description: t.cardLearnMore,
      buttonText: t.cardOurPrograms,
      link: "/programs",
      hasImage: false
    },
    {
      id: 4,
      image: "/photo_1/IMG-20251227-WA0030.jpg",
      title: t.ourImpact,
      description: t.cardOurImpact,
      buttonText: t.cardViewImpact,
      link: "/impact",
      hasImage: true
    }
  ]

  return (
    <section className={styles.hero} aria-label="Hero section">
      {/* Background Image with Overlay - Left 65-70% */}
      <div className={styles.heroBackground}>
        <div className={styles.heroOverlay}></div>
      </div>

      {/* Content Container */}
      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          
          {/* Left Content - Overlayed on Background */}
          <motion.div
            className={styles.heroContent}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative SVG Underline */}
            <motion.div
              variants={textVariants}
              className={styles.decorativeLine}
            >
              <svg 
                className={styles.svgLine}
                viewBox="0 0 128 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0 4C20 0 40 8 60 4C80 0 100 8 120 4C125 3 128 4 128 4" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Main Heading - Uppercase, Extra Bold */}
            <motion.h1
              variants={textVariants}
              className={styles.heroTitle}
            >
              {t.heroTitle}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={textVariants}
              className={styles.heroSubtitle}
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Mission Paragraph - 2 lines max */}
            <motion.p
              variants={textVariants}
              className={styles.heroMission}
            >
              {t.heroMission}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={textVariants}
            >
              <Link
                to="/get-involved"
                className={styles.ctaLink}
              >
                <motion.button
                  className={styles.ctaButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.getInvolved}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Cards and Upcoming Events Widget */}
          <div className={styles.rightSideContainer}>
            {/* Floating Cards Section */}
            <motion.div
              className={styles.cardsContainer}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  className={`${styles.actionCard} ${!card.hasImage ? styles.diagonalCard : ''}`}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Card Image Thumbnail */}
                  {card.hasImage ? (
                    <div className={styles.cardImageContainer}>
                      <img
                        src={card.image}
                        alt={card.title}
                        className={styles.cardImage}
                      />
                      <Link to={card.link}>
                        <motion.button
                          className={styles.cardButton}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {card.buttonText}
                        </motion.button>
                      </Link>
                    </div>
                  ) : null}

                  {/* Card Content */}
                  <h3 className={styles.cardTitle}>
                    {card.title}
                  </h3>
                  <p className={styles.cardDescription}>
                    {card.description}
                  </p>

                  {/* Green CTA Button */}
                  {!card.hasImage && (
                    <Link to={card.link}>
                      <motion.button
                        className={styles.cardButton}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {card.buttonText}
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Upcoming Events Widget */}
            <UpcomingEventsWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
