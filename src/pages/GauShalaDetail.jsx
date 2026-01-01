import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './InitiativeDetail.module.css'

const GauShalaDetail = () => {
  useEffect(() => {
    document.title = 'Gau Shala Sewa | Sankalp Sewa Sansthan Kishangarh'
  }, [])

  // Placeholder images - replace with actual images when available
  const galleryImages = [
    '/photo_1/IMG-20251227-WA0026.jpg',
    '/photo_1/IMG-20251227-WA0027.jpg',
    '/photo_1/IMG-20251227-WA0028.jpg',
    '/photo_1/IMG-20251227-WA0029.jpg',
    '/photo_1/IMG-20251227-WA0030.jpg',
    '/photo_1/IMG-20251227-WA0031.jpg'
  ]

  const impactPoints = [
    {
      icon: '🐄',
      title: 'Weekly Nourishment',
      description: 'Every Thursday, we provide nutritious gur and chara to ensure the health and well-being of cows.'
    },
    {
      icon: '❤️',
      title: 'Compassionate Care',
      description: 'Our volunteers show dedication and love in caring for these gentle animals, reflecting our values of compassion.'
    },
    {
      icon: '🌾',
      title: 'Quality Nutrition',
      description: 'We source high-quality jaggery (gur) and fresh fodder (chara) to provide balanced nutrition.'
    },
    {
      icon: '🤝',
      title: 'Community Engagement',
      description: 'This initiative brings together volunteers and community members in service of animal welfare.'
    },
    {
      icon: '📅',
      title: 'Consistent Service',
      description: 'Our weekly commitment ensures reliable care and builds trust with the community and the animals we serve.'
    },
    {
      icon: '🌱',
      title: 'Traditional Values',
      description: 'Gau Sewa honors our cultural traditions while promoting modern animal welfare practices.'
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
            <div className={styles.heroIcon}>🐄</div>
            <h1 className={styles.heroTitle}>Gau Shala Sewa</h1>
            <p className={styles.heroSubtitle}>
              Weekly Cow Feeding Initiative - Every Thursday
            </p>
            <p className={styles.heroDescription}>
              A compassionate commitment to animal welfare through weekly provision of 
              gur (jaggery) and nutritious chara (fodder) to cows, honoring traditional 
              values while ensuring the health and well-being of these gentle animals.
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
            <h2 className={styles.sectionTitle}>About Gau Shala Sewa</h2>
            <div className={styles.textContent}>
              <p>
                Gau Shala Sewa is one of our most cherished weekly initiatives, reflecting 
                our deep commitment to animal welfare and traditional values. Every Thursday, 
                our dedicated team of volunteers gathers to provide essential nourishment 
                to cows in our care.
              </p>
              <p>
                This initiative goes beyond simple feeding—it represents our respect for 
                these gentle creatures and our cultural heritage. Cows hold a special place 
                in our traditions, and through Gau Sewa, we ensure they receive the care, 
                nutrition, and compassion they deserve.
              </p>
              <p>
                We provide high-quality jaggery (gur), which is rich in minerals and provides 
                essential nutrients, along with fresh, nutritious chara (fodder) that ensures 
                a balanced diet. Our volunteers work with dedication and love, creating a 
                meaningful connection between our organization and the animals we serve.
              </p>
              <p>
                This weekly commitment has become a cornerstone of our community engagement, 
                bringing together people from all walks of life who share a common goal: 
                showing compassion and care for our animal friends.
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
                    alt={`Gau Shala Sewa activity ${index + 1}`}
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
            <h2 className={styles.ctaTitle}>Support Gau Shala Sewa</h2>
            <p className={styles.ctaText}>
              Your donation helps us maintain this weekly service, ensuring that cows 
              receive consistent, quality nutrition and care. Every contribution makes 
              a difference in the lives of these animals.
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

export default GauShalaDetail

