import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './EventDetail.module.css'

// Event data - in a real app, this would come from an API or database
const getEventData = () => {
  return {
    'ladli-ghar-monthly': {
      date: "Since 2022 (Monthly)",
      title: "Ladli Ghar Ajmer – Monthly Support",
      description: "Since 2022, Sankalp Sewa Sansthan Kishangarh has been providing monthly essential support to the girls of Ladli Ghar, Ajmer. This includes stationery, edible items, and daily necessities to ensure their well-being, education, and dignity.",
      fullDescription: "Our monthly support to Ladli Ghar Ajmer represents a long-term commitment to the welfare of young girls. Every month, our dedicated team visits the facility to deliver essential supplies that directly impact their daily lives and educational journey. We provide comprehensive stationery including notebooks, pens, pencils, erasers, and other learning materials that are crucial for their studies. Additionally, we supply edible items and daily necessities that ensure their basic needs are met. This initiative has been running consistently since 2022, building trust and creating a stable support system for these girls. Our relationship with Ladli Ghar goes beyond material support—it's about showing these girls that they matter, that their education is important, and that the community cares about their future.",
      impact: [
        "Over 50 girls receive monthly essential supplies",
        "Consistent support since 2022 builds trust and stability",
        "Educational materials directly support their learning",
        "Nutritional items ensure their well-being",
        "Community partnership creates lasting impact"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0032.jpg',
        '/photo_1/IMG-20251227-WA0033.jpg',
        '/photo_1/IMG-20251227-WA0034.jpg',
        '/photo_1/IMG-20251227-WA0035.jpg'
      ]
    },
    'gau-sewa-thursday': {
      date: "Every Thursday",
      title: "Gau Sewa - Gur & Chara Distribution",
      description: "As part of our weekly Gau Sewa initiative, we provide gur and nutritious chara to cows every Thursday. This ongoing service reflects our commitment to compassion, tradition, and animal welfare.",
      fullDescription: "Gau Sewa is one of our most cherished weekly initiatives, reflecting our deep commitment to animal welfare and traditional values. Every Thursday, our dedicated team of volunteers gathers to provide essential nourishment to cows in our care. This initiative goes beyond simple feeding—it represents our respect for these gentle creatures and our cultural heritage. We provide high-quality jaggery (gur), which is rich in minerals and provides essential nutrients, along with fresh, nutritious chara (fodder) that ensures a balanced diet. Our volunteers work with dedication and love, creating a meaningful connection between our organization and the animals we serve. This weekly commitment has become a cornerstone of our community engagement, bringing together people from all walks of life who share a common goal: showing compassion and care for our animal friends.",
      impact: [
        "Weekly nutrition ensures healthy and well-cared-for cows",
        "Honors traditional values while promoting modern animal welfare",
        "Brings community together in service",
        "Consistent care builds trust and reliability",
        "Volunteers gain meaningful experience in animal care"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0026.jpg',
        '/photo_1/IMG-20251227-WA0029.jpg',
        '/photo_1/IMG-20251227-WA0030.jpg',
        '/photo_1/IMG-20251227-WA0031.jpg'
      ]
    },
    'mega-health-camp': {
      date: 'January 2025',
      title: 'Mega Health Camp',
      description: 'A comprehensive health camp providing free check-ups and medicines to over 500 villagers in rural Rajasthan.',
      fullDescription: 'In January 2025, we organized a comprehensive Mega Health Camp that served over 500 villagers across rural Rajasthan. This large-scale initiative brought together medical professionals, volunteers, and community members to provide essential healthcare services to underserved populations. The camp offered free health check-ups, consultations with doctors, basic diagnostic tests, and distribution of essential medicines. We focused on preventive care, health education, and addressing common health issues prevalent in rural areas. The event was a tremendous success, demonstrating our commitment to making healthcare accessible to those who need it most.',
      impact: [
        "Over 500 villagers received free health check-ups",
        "Essential medicines distributed to those in need",
        "Health education sessions conducted",
        "Follow-up care plans created for critical cases",
        "Strengthened community trust in healthcare services"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0030.jpg',
        '/photo_1/IMG-20251227-WA0031.jpg',
        '/photo_1/IMG-20251227-WA0032.jpg',
        '/photo_1/IMG-20251227-WA0033.jpg'
      ]
    },
    'winter-cloth-distribution': {
      date: 'December 2024',
      title: 'Winter Cloth Distribution',
      description: 'Distributed warm clothes and blankets to homeless individuals and families in Jaipur and surrounding areas.',
      fullDescription: 'During the harsh winter of December 2024, we organized a comprehensive Winter Cloth Distribution drive to help homeless individuals and families in Jaipur and surrounding areas. Recognizing the critical need for warm clothing during the cold months, we collected and distributed blankets, sweaters, shawls, and other winter essentials. Our volunteers worked tirelessly to identify those most in need, ensuring that the most vulnerable members of our community received protection from the cold. This initiative not only provided physical warmth but also brought hope and care to those who often feel forgotten.',
      impact: [
        "Hundreds of individuals received warm clothing",
        "Families with children prioritized for support",
        "Blankets and sweaters distributed to homeless",
        "Community awareness raised about winter needs",
        "Partnerships formed with local organizations"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0034.jpg',
        '/photo_1/IMG-20251227-WA0035.jpg',
        '/photo_1/IMG-20251227-WA0036.jpg',
        '/photo_1/IMG-20251227-WA0037.jpg'
      ]
    },
    'skill-development-workshop': {
      date: 'November 2024',
      title: 'Skill Development Workshop',
      description: 'Launched a new vocational training center for women, offering courses in stitching and handicrafts.',
      fullDescription: 'In November 2024, we launched a new vocational training center specifically designed to empower women through skill development. The center offers comprehensive courses in stitching, tailoring, and handicrafts, providing women with practical skills that can lead to economic independence. The program includes both theoretical knowledge and hands-on training, ensuring participants are job-ready upon completion. We also provide support in connecting graduates with employment opportunities and helping them start their own small businesses. This initiative represents our commitment to women empowerment and economic development in the community.',
      impact: [
        "New vocational training center established",
        "Women gain marketable skills in stitching and handicrafts",
        "Employment opportunities created",
        "Economic independence promoted",
        "Community capacity building enhanced"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0038.jpg',
        '/photo_1/IMG-20251227-WA0039.jpg',
        '/photo_1/IMG-20251227-WA0040.jpg',
        '/photo_1/IMG-20251227-WA0041.jpg'
      ]
    },
    'diwali-food-drive': {
      date: 'October 2024',
      title: 'Diwali Food Drive',
      description: 'Provided festive meals and ration kits to 1000+ underprivileged families during the Diwali festival.',
      fullDescription: 'During the festive season of Diwali in October 2024, we organized a massive food drive to ensure that underprivileged families could celebrate the festival with dignity and joy. We distributed festive meals and comprehensive ration kits to over 1000 families across Rajasthan. Each kit contained essential food items including rice, dal, spices, oil, and special festival treats. Our volunteers worked day and night to prepare and distribute these kits, bringing the spirit of Diwali to those who might otherwise have gone without. This initiative embodied the true meaning of the festival—sharing joy, spreading light, and caring for our community.',
      impact: [
        "1000+ families received festive meals and ration kits",
        "Festival celebrated with dignity and joy",
        "Essential food items provided for weeks",
        "Community spirit strengthened",
        "Volunteers experienced meaningful service"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0042.jpg',
        '/photo_1/IMG-20251227-WA0043.jpg',
        '/photo_1/IMG-20251227-WA0044.jpg',
        '/photo_1/IMG-20251227-WA0045.jpg'
      ]
    },
    'tree-plantation-drive': {
      date: 'September 2024',
      title: 'Tree Plantation Drive',
      description: 'Planted 5000 saplings across 10 villages to promote environmental conservation and green cover.',
      fullDescription: 'In September 2024, we organized a large-scale Tree Plantation Drive across 10 villages in Rajasthan, planting over 5000 saplings. This environmental conservation initiative brought together community members, students, and volunteers in a collective effort to increase green cover and combat climate change. We focused on native tree species that are well-suited to the local climate and provide multiple benefits including shade, fruit, and environmental protection. The drive included educational sessions about the importance of trees, proper planting techniques, and long-term care. This initiative reflects our commitment to environmental protection and sustainable development.',
      impact: [
        "5000 saplings planted across 10 villages",
        "Environmental awareness increased in communities",
        "Green cover expanded significantly",
        "Long-term environmental benefits established",
        "Community ownership of conservation created"
      ],
      galleryImages: [
        '/photo_1/IMG-20251227-WA0046.jpg',
        '/photo_1/IMG-20251227-WA0047.jpg',
        '/photo_1/IMG-20251227-WA0048.jpg',
        '/photo_1/IMG-20251227-WA0057.jpg'
      ]
    }
  }
}

const EventDetail = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const eventData = getEventData()

  useEffect(() => {
    if (!eventData[eventId]) {
      document.title = 'Event Not Found | Sankalp Sewa Sansthan Kishangarh'
    } else {
      document.title = `${eventData[eventId].title} | Sankalp Sewa Sansthan Kishangarh`
    }
  }, [eventId])

  if (!eventData[eventId]) {
    return (
      <div className={styles.eventDetail}>
        <section className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.heroTitle}>Event Not Found</h1>
            <p className={styles.heroSubtitle}>
              The event you're looking for doesn't exist.
            </p>
            <Link to="/programs" className="btn btn-primary">
              Back to Programs
            </Link>
          </div>
        </section>
      </div>
    )
  }

  const event = eventData[eventId]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    }
  }

  return (
    <div className={styles.eventDetail}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className={styles.dateBadge}>{event.date}</div>
            <h1 className={styles.heroTitle}>{event.title}</h1>
            <p className={styles.heroSubtitle}>{event.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Full Description */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.contentSection}
          >
            <h2 className={styles.sectionTitle}>Event Details</h2>
            <div className={styles.textContent}>
              <p>{event.fullDescription}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="section section-bg">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
              Impact Summary
            </h2>
            <div className={styles.impactList}>
              {event.impact.map((point, index) => (
                <motion.div
                  key={index}
                  className={styles.impactItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className={styles.impactIcon}>✓</span>
                  <span className={styles.impactText}>{point}</span>
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
              Photo Gallery
            </h2>
            <div className={styles.galleryGrid}>
              {event.galleryImages.map((image, index) => (
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
                    alt={`${event.title} - Photo ${index + 1}`}
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
            <h2 className={styles.ctaTitle}>Support Our Work</h2>
            <p className={styles.ctaText}>
              Help us continue organizing impactful events and initiatives that transform 
              lives and strengthen communities across Rajasthan.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/donate" className="btn btn-primary btn-lg">
                Donate Now
              </Link>
              <button
                onClick={() => navigate('/programs')}
                className="btn btn-secondary btn-lg"
              >
                View All Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default EventDetail

