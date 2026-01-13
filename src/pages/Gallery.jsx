import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Gallery.module.css'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [selectedImage, setSelectedImage] = useState(null)
  const { language } = useLanguage()
  const t = translations[language].gallery

  useEffect(() => {
    document.title = `${t.pageTitle} | Sankalp Sewa Sansthan Kishangarh`
  }, [t.pageTitle])

  // Real images from photo folders
  const galleryImages = [
    { id: 1, src: '/photo_1/IMG-20251227-WA0026.jpg', alt: 'Community event', caption: t.imageCaptions.communityEvent },
    { id: 2, src: '/photo_1/IMG-20251227-WA0029.jpg', alt: 'Education program', caption: t.imageCaptions.educationProgram },
    { id: 3, src: '/photo_1/IMG-20251227-WA0030.jpg', alt: 'Medical camp', caption: t.imageCaptions.medicalCamp },
    { id: 4, src: '/photo_1/IMG-20251227-WA0031.jpg', alt: 'Skill development', caption: t.imageCaptions.skillDevelopment },
    { id: 5, src: '/photo_1/IMG-20251227-WA0030.jpg', alt: 'Environmental awareness', caption: t.imageCaptions.environmentalAwareness },
    { id: 6, src: '/photo_1/IMG-20251227-WA0031.jpg', alt: 'Women empowerment', caption: t.imageCaptions.womenEmpowerment },
    { id: 7, src: '/photo_1/IMG-20251227-WA0032.jpg', alt: 'Senior citizen care', caption: t.imageCaptions.seniorCitizenCare },
    { id: 8, src: '/photo_1/IMG-20251227-WA0033.jpg', alt: 'Blood donation', caption: t.imageCaptions.bloodDonation },
    { id: 9, src: '/photo_1/IMG-20251227-WA0034.jpg', alt: 'Community service', caption: t.imageCaptions.communityService },
    { id: 10, src: '/photo_1/IMG-20251227-WA0035.jpg', alt: 'Community outreach', caption: t.imageCaptions.communityOutreach },
    { id: 11, src: '/photo_1/IMG-20251227-WA0036.jpg', alt: 'Social awareness', caption: t.imageCaptions.socialAwareness },
    { id: 12, src: '/photo_1/IMG-20251227-WA0037.jpg', alt: 'Volunteer work', caption: t.imageCaptions.volunteerWork },
    { id: 13, src: '/photo_2/WhatsApp Image 2025-12-27 at 14.25.48_e58897ce.jpg', alt: 'Program event', caption: t.imageCaptions.programEvent },
    { id: 14, src: '/photo_2/WhatsApp Image 2025-12-27 at 14.25.49_21dd1f81.jpg', alt: 'Community engagement', caption: t.imageCaptions.communityEngagement },
    { id: 15, src: '/photo_2/WhatsApp Image 2025-12-27 at 14.25.49_b8755a14.jpg', alt: 'Social service', caption: t.imageCaptions.socialService },
    { id: 16, src: '/replace anisha.jpg', alt: 'Community member', caption: t.imageCaptions.communityMember },
    { id: 17, src: '/g1.jpg', alt: 'Community activity', caption: t.imageCaptions.communityActivity }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
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
    <div className={styles.gallery}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
          <p className={styles.introText}>
            {t.intro}
          </p>
        </div>
      </section>

      <section className="section" ref={ref}>
        <div className="container">
          <motion.div 
            className={styles.galleryGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {galleryImages.map((image, index) => (
              <motion.div 
                key={image.id} 
                className={styles.galleryItem}
                variants={itemVariants}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => setSelectedImage(image)}
              >
                <div className={styles.imageContainer}>
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className={styles.galleryImage}
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className={styles.imageOverlay}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={styles.imageCaption}>{image.caption}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedImage && (
        <motion.div 
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className={styles.modalImage}
            />
            <p className={styles.modalCaption}>{selectedImage.caption}</p>
          </motion.div>
        </motion.div>
      )}

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.note}>
            <p>
              <strong>{t.note}</strong> {t.noteText}{' '}
              <Link to="/contact" className={styles.contactLink}>{t.contactUs}</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery


