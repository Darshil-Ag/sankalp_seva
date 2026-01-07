import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import styles from './CowFeedingVideos.module.css'

const CowFeedingVideos = () => {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [playingVideo, setPlayingVideo] = useState(null)

  const videos = [
    {
      id: 1,
      src: '/gao/1.mp4',
      title: language === 'en' ? 'Gau Sewa - Cow Feeding Session 1' : 'गौ सेवा - गायों को खिलाना सत्र 1'
    },
    {
      id: 2,
      src: '/gao/2.mp4',
      title: language === 'en' ? 'Gau Sewa - Cow Feeding Session 2' : 'गौ सेवा - गायों को खिलाना सत्र 2'
    },
    {
      id: 3,
      src: '/gao/3.mp4',
      title: language === 'en' ? 'Gau Sewa - Cow Feeding Session 3' : 'गौ सेवा - गायों को खिलाना सत्र 3'
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

  const videoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const handleVideoPlay = (videoId) => {
    setPlayingVideo(videoId)
  }

  const handleVideoPause = () => {
    setPlayingVideo(null)
  }

  return (
    <section className={styles.videosSection} aria-label="Cow Feeding Videos" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeader}
        >
          <div className={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
              <circle cx="12" cy="13" r="3"></circle>
            </svg>
          </div>
          <h2 className={styles.sectionTitle}>
            {language === 'en' ? 'Our Work in Action' : 'कार्रवाई में हमारा काम'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {language === 'en' 
              ? 'Watch our weekly Gau Sewa (Cow Feeding) sessions. See how your donations help us provide nutritious food to cows every Thursday.'
              : 'हमारे साप्ताहिक गौ सेवा (गायों को खिलाना) सत्र देखें। देखें कि कैसे आपके दान हर गुरुवार को गायों को पौष्टिक भोजन प्रदान करने में हमारी मदद करते हैं।'
            }
          </p>
        </motion.div>

        <motion.div
          className={styles.videosGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className={styles.videoCard}
              variants={videoVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.videoContainer}>
                <video
                  src={video.src}
                  controls
                  className={styles.video}
                  onPlay={() => handleVideoPlay(video.id)}
                  onPause={handleVideoPause}
                  onEnded={handleVideoPause}
                  preload="metadata"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
                <div className={styles.videoOverlay}>
                  <div className={styles.playIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoDescription}>
                  {language === 'en' 
                    ? 'Weekly Gau Sewa session'
                    : 'साप्ताहिक गौ सेवा सत्र'
                  }
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={styles.ctaBox}
        >
          <p className={styles.ctaText}>
            {language === 'en' 
              ? 'Support our Gau Sewa initiative and help us continue this weekly service'
              : 'हमारी गौ सेवा पहल का समर्थन करें और हमें इस साप्ताहिक सेवा को जारी रखने में मदद करें'
            }
          </p>
          <motion.a
            href="/donate"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Donate Now' : 'अभी दान करें'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default CowFeedingVideos

