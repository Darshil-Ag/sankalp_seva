import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './InitiativeDetail.module.css'

const LadliGharDetail = () => {
  useEffect(() => {
    document.title = 'Ladli Ghar Ajmer Support | Sankalp Sewa Sansthan Kishangarh'
  }, [])

  // Placeholder images - replace with actual images when available
  const galleryImages = [
    '/photo_1/IMG-20251227-WA0032.jpg',
    '/photo_1/IMG-20251227-WA0033.jpg',
    '/photo_1/IMG-20251227-WA0034.jpg',
    '/photo_1/IMG-20251227-WA0035.jpg',
    '/photo_1/IMG-20251227-WA0036.jpg',
    '/photo_1/IMG-20251227-WA0037.jpg'
  ]

  const impactPoints = [
    {
      icon: '📚',
      title: 'Educational Support',
      description: 'We provide essential stationery items including notebooks, pens, pencils, and other learning materials to support their education.'
    },
    {
      icon: '🍎',
      title: 'Nutritional Essentials',
      description: 'Monthly provision of edible items ensures the girls have access to nutritious food and snacks for their well-being.'
    },
    {
      icon: '🏠',
      title: 'Dignified Living',
      description: 'Our support helps maintain the dignity and comfort of the girls at Ladli Ghar through essential daily necessities.'
    },
    {
      icon: '💝',
      title: 'Consistent Care',
      description: 'Since 2022, our monthly commitment has provided reliable support, building trust and stability in their lives.'
    },
    {
      icon: '👧',
      title: 'Empowerment',
      description: 'By ensuring access to education and basic needs, we empower these girls to build brighter futures for themselves.'
    },
    {
      icon: '🤝',
      title: 'Community Partnership',
      description: 'Our ongoing relationship with Ladli Ghar demonstrates long-term commitment to the welfare of these young girls.'
    }
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
    <div className={styles.initiativeDetail}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className={styles.heroIcon}>🏠</div>
            <h1 className={styles.heroTitle}>Ladli Ghar Ajmer Support</h1>
            <p className={styles.heroSubtitle}>
              Monthly Essential Support - Every Monday
            </p>
            <p className={styles.heroDescription}>
              Since 2022, we have been providing monthly essential support to the girls 
              of Ladli Ghar, Ajmer. This includes stationery, edible items, and daily 
              necessities to ensure their well-being, education, and dignity.
            </p>
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
            <h2 className={styles.sectionTitle}>About Ladli Ghar Ajmer Support</h2>
            <div className={styles.textContent}>
              <p>
                Ladli Ghar Ajmer is a home for girls who need care, support, and opportunities 
                to thrive. Since 2022, Sankalp Sewa Sansthan Kishangarh has been a dedicated partner in 
                ensuring these young girls have access to the essentials they need for a 
                dignified and empowered life.
              </p>
              <p>
                Every Monday, our team visits Ladli Ghar to deliver monthly supplies that 
                directly impact the daily lives and education of these girls. We provide 
                comprehensive support including educational materials like notebooks, pens, 
                pencils, and other stationery items that are crucial for their learning journey.
              </p>
              <p>
                Beyond educational support, we also provide edible items and daily necessities 
                that ensure their basic needs are met. This holistic approach recognizes that 
                education and well-being go hand in hand—a child cannot learn effectively 
                without proper nutrition and a sense of security.
              </p>
              <p>
                Our monthly commitment has created a bond of trust and reliability. The girls 
                and caregivers at Ladli Ghar know they can count on us, and this consistency 
                has allowed us to understand their evolving needs and provide increasingly 
                targeted support.
              </p>
              <p>
                This initiative represents more than just material support—it's a promise to 
                stand by these girls as they grow, learn, and build their futures. Every 
                donation helps us maintain this commitment and expand our support to reach 
                even more girls in need.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Points */}
      <section className="section section-bg">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
              How Your Donation Helps
            </h2>
            <div className={styles.impactGrid}>
              {impactPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className={styles.impactCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={styles.impactIcon}>{point.icon}</div>
                  <h3 className={styles.impactTitle}>{point.title}</h3>
                  <p className={styles.impactDescription}>{point.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
              Gallery
            </h2>
            <div className={styles.galleryGrid}>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={styles.galleryItem}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <img
                    src={image}
                    alt={`Ladli Ghar Ajmer support activity ${index + 1}`}
                    className={styles.galleryImage}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section section-bg">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.ctaSection}
          >
            <h2 className={styles.ctaTitle}>Support Ladli Ghar Ajmer</h2>
            <p className={styles.ctaText}>
              Your donation helps us continue our monthly support to the girls of Ladli Ghar, 
              ensuring they have access to education, nutrition, and dignity. Every contribution 
              directly impacts their lives and futures.
            </p>
            <Link to="/donate" className="btn btn-primary btn-lg">
              Donate Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LadliGharDetail

