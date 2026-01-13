import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './About.module.css'

const About = () => {
  const { language } = useLanguage()
  const t = translations[language].about

  useEffect(() => {
    document.title = `${t.pageTitle} | Sankalp Sewa Sansthan Kishangarh`
  }, [t.pageTitle])

  const galleryImages = [
    "/photo_1/IMG-20251227-WA0026.jpg",
    "/photo_1/IMG-20251227-WA0029.jpg",
    "/photo_1/IMG-20251227-WA0030.jpg",
    "/photo_1/IMG-20251227-WA0031.jpg"
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    }
  }

  return (
    <div className={styles.about}>
      <motion.section 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <motion.h1 
            className={styles.pageTitle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.pageTitle}
          </motion.h1>
          <motion.p 
            className={styles.introText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.intro}
          </motion.p>
        </div>
      </motion.section>

      {/* Organization Section */}
      <section className="section">
        <div className="container">
          <div className={styles.splitSection}>
            <motion.div 
              className={styles.imageContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <img 
                src="/photo_1/IMG-20251227-WA0031.jpg" 
                alt="Our Team" 
                className={styles.aboutImage} 
              />
            </motion.div>
            <motion.div 
              className={styles.textContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className={styles.sectionHeading} style={{ textAlign: 'left' }}>
                {t.ourOrganization}
              </h2>
              <p>
                {t.organizationDesc1}
              </p>
              <p>
                {t.organizationDesc2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className={styles.splitSectionReverse}>
            <motion.div 
              className={styles.textContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className={styles.sectionHeading} style={{ textAlign: 'left' }}>
                {t.ourVision}
              </h2>
              <p>
                {t.visionDesc}
              </p>
            </motion.div>
            <motion.div 
              className={styles.imageContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <img 
                src="/photo_1/IMG-20251227-WA0035.jpg" 
                alt="Our Vision" 
                className={styles.aboutImage} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section">
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>{t.ourObjectives}</h2>
            <p className={styles.objectivesIntro}>
              {t.objectivesIntro}
            </p>
            <motion.ul 
              className={styles.objectivesList}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
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
              {t.objectives.map((objective, index) => (
                <motion.li 
                  key={index} 
                  className={styles.objectiveItem}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.4 }
                    }
                  }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <motion.span 
                    className={styles.objectiveIcon}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </motion.span>
                  <span>{objective}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className={styles.splitSection}>
            <motion.div 
              className={styles.imageContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <img 
                src="/photo_1/IMG-20251227-WA0045.jpg" 
                alt="Our Approach" 
                className={styles.aboutImage} 
              />
            </motion.div>
            <motion.div 
              className={styles.textContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className={styles.sectionHeading} style={{ textAlign: 'left' }}>
                {t.ourApproach}
              </h2>
              <p>
                {t.approachDesc1}
              </p>
              <p>
                {t.approachDesc2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
          >
            <h2 className={styles.sectionHeading}>{t.lifeAtSankalp}</h2>
            <div className={styles.galleryGrid}>
              {galleryImages.map((img, index) => (
                <motion.div 
                  key={index} 
                  className={styles.galleryItem}
                  whileHover={{ y: -5 }}
                >
                  <img src={img} alt={`Gallery ${index + 1}`} className={styles.galleryImage} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

