import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const actionCards = [
    {
      title: 'Donate',
      icon: '💚',
      link: '/contact',
      description: 'Support our mission'
    },
    {
      title: 'Join Volunteer',
      icon: '🤝',
      link: '/get-involved',
      description: 'Make a difference'
    },
    {
      title: 'Campaigns',
      icon: '📢',
      link: '/programs',
      description: 'See our work'
    }
  ]

  return (
    <section className={styles.hero} aria-label="Hero section">
      <div className={styles.heroBackground}>
        <div className={styles.heroOverlay}></div>
      </div>
      
      <div className={styles.heroContainer}>
        <motion.div 
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.heroTitle} variants={itemVariants}>
            Together, We Can Transform Lives
          </motion.h1>
          <motion.p className={styles.heroSubtitle} variants={itemVariants}>
            Serving communities across Rajasthan with compassion, dedication, and unwavering commitment to social change.
          </motion.p>
          <motion.div className={styles.heroActions} variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/get-involved" className={styles.primaryCTA}>
                Get Involved
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.actionCards}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actionCards.map((card, index) => (
            <motion.div
              key={index}
              className={styles.actionCard}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={card.link} className={styles.cardLink}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

