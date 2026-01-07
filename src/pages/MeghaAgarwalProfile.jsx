import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import styles from './MeghaAgarwalProfile.module.css'

const MeghaAgarwalProfile = () => {
  const { language } = useLanguage()

  useEffect(() => {
    document.title = language === 'en' 
      ? 'Megha Agarwal - President | Sankalp Sewa Sansthan Kishangarh'
      : 'मेघा अग्रवाल - अध्यक्ष | संकल्प सेवा संस्थान'
  }, [language])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    }
  }

  return (
    <div className={styles.profile}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={styles.heroContent}
          >
            <div className={styles.profileImageContainer}>
              <motion.img
                src="/members/megha agarwal.jpeg"
                alt="Megha Agarwal"
                className={styles.profileImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
            <div className={styles.heroText}>
              <motion.div
                variants={fadeInUp}
                className={styles.badge}
              >
                {language === 'en' ? 'President' : 'अध्यक्ष'}
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className={styles.heroTitle}
              >
                Megha Agarwal
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className={styles.heroSubtitle}
              >
                {language === 'en' 
                  ? 'Leading with Heart, Creating with Hands'
                  : 'दिल से नेतृत्व, हाथों से सृजन'
                }
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.contentSection}
          >
            <h2 className={styles.sectionTitle}>
              {language === 'en' ? 'About Megha Agarwal' : 'मेघा अग्रवाल के बारे में'}
            </h2>
            <div className={styles.textContent}>
              <p>
                {language === 'en' 
                  ? 'Megha Agarwal is the President of Sankalp Sewa Sansthan, a Kishangarh-based NGO working towards social welfare, women empowerment, and community development. She is also the Founder of Arty Crafty, a creative handmade wall décor brand that promotes art, craftsmanship, and sustainable livelihood opportunities for women artisans.'
                  : 'मेघा अग्रवाल संकल्प सेवा संस्थान की अध्यक्ष हैं, जो किशनगढ़ स्थित एक गैर-सरकारी संगठन है जो सामाजिक कल्याण, महिला सशक्तिकरण और सामुदायिक विकास की दिशा में काम कर रहा है। वह आर्टी क्राफ्टी की संस्थापक भी हैं, एक रचनात्मक हस्तनिर्मित दीवार सजावट ब्रांड जो कला, शिल्प कौशल और महिला कारीगरों के लिए स्थायी आजीविका के अवसरों को बढ़ावा देता है।'
                }
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="section section-bg">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.rolesGrid}
          >
            <motion.div
              variants={fadeInUp}
              className={styles.roleCard}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={styles.roleIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className={styles.roleTitle}>
                {language === 'en' ? 'President' : 'अध्यक्ष'}
              </h3>
              <p className={styles.roleDescription}>
                {language === 'en' 
                  ? 'Leading Sankalp Sewa Sansthan in its mission to serve communities across Rajasthan through social welfare, women empowerment, and community development initiatives.'
                  : 'राजस्थान भर के समुदायों की सेवा करने के लिए सामाजिक कल्याण, महिला सशक्तिकरण और सामुदायिक विकास पहलों के माध्यम से संकल्प सेवा संस्थान का नेतृत्व कर रही हैं।'
                }
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={styles.roleCard}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={styles.roleIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className={styles.roleTitle}>
                {language === 'en' ? 'Founder' : 'संस्थापक'}
              </h3>
              <p className={styles.roleDescription}>
                {language === 'en' 
                  ? 'Founder of Arty Crafty, a creative handmade wall décor brand that promotes art, craftsmanship, and sustainable livelihood opportunities for women artisans.'
                  : 'आर्टी क्राफ्टी की संस्थापक, एक रचनात्मक हस्तनिर्मित दीवार सजावट ब्रांड जो कला, शिल्प कौशल और महिला कारीगरों के लिए स्थायी आजीविका के अवसरों को बढ़ावा देता है।'
                }
              </p>
              <motion.a
                href="https://artycrafty.net/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Visit Arty Crafty' : 'आर्टी क्राफ्टी देखें'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.contentSection}
          >
            <h2 className={styles.sectionTitle}>
              {language === 'en' ? 'Impact & Vision' : 'प्रभाव और दृष्टि'}
            </h2>
            <div className={styles.impactList}>
              <motion.div
                variants={fadeInUp}
                className={styles.impactItem}
                whileHover={{ x: 8 }}
              >
                <div className={styles.impactIcon}>🤝</div>
                <div className={styles.impactText}>
                  <strong>{language === 'en' ? 'Social Welfare Leadership' : 'सामाजिक कल्याण नेतृत्व'}</strong>
                  <p>
                    {language === 'en' 
                      ? 'Leading initiatives that directly impact communities across Rajasthan, focusing on education, healthcare, and sustainable development.'
                      : 'राजस्थान भर के समुदायों पर सीधे प्रभाव डालने वाली पहलों का नेतृत्व करना, शिक्षा, स्वास्थ्य सेवा और सतत विकास पर ध्यान केंद्रित करना।'
                    }
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className={styles.impactItem}
                whileHover={{ x: 8 }}
              >
                <div className={styles.impactIcon}>👩‍🎨</div>
                <div className={styles.impactText}>
                  <strong>{language === 'en' ? 'Women Empowerment' : 'महिला सशक्तिकरण'}</strong>
                  <p>
                    {language === 'en' 
                      ? 'Through Arty Crafty, creating sustainable livelihood opportunities for women artisans, empowering them through art and craftsmanship.'
                      : 'आर्टी क्राफ्टी के माध्यम से महिला कारीगरों के लिए स्थायी आजीविका के अवसर बनाना, कला और शिल्प कौशल के माध्यम से उन्हें सशक्त बनाना।'
                    }
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className={styles.impactItem}
                whileHover={{ x: 8 }}
              >
                <div className={styles.impactIcon}>🎨</div>
                <div className={styles.impactText}>
                  <strong>{language === 'en' ? 'Art & Craftsmanship' : 'कला और शिल्प कौशल'}</strong>
                  <p>
                    {language === 'en' 
                      ? 'Promoting traditional Indian craftsmanship and contemporary art through handmade wall décor, bringing beauty and culture into homes.'
                      : 'हस्तनिर्मित दीवार सजावट के माध्यम से पारंपरिक भारतीय शिल्प कौशल और समकालीन कला को बढ़ावा देना, घरों में सुंदरता और संस्कृति लाना।'
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-bg">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.ctaSection}
          >
            <h2 className={styles.ctaTitle}>
              {language === 'en' 
                ? 'Support Our Mission'
                : 'हमारे मिशन का समर्थन करें'
              }
            </h2>
            <p className={styles.ctaText}>
              {language === 'en' 
                ? 'Join us in making a difference. Your support helps us continue our work in social welfare, women empowerment, and community development.'
                : 'अंतर लाने में हमारे साथ जुड़ें। आपका समर्थन हमें सामाजिक कल्याण, महिला सशक्तिकरण और सामुदायिक विकास में अपना काम जारी रखने में मदद करता है।'
              }
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/donate" className={styles.ctaButton}>
                {language === 'en' ? 'Donate Now' : 'अभी दान करें'}
              </Link>
              <Link to="/get-involved" className={styles.ctaButtonSecondary}>
                {language === 'en' ? 'Get Involved' : 'शामिल हों'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MeghaAgarwalProfile

