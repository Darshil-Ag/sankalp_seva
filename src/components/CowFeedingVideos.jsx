import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import styles from './CowFeedingVideos.module.css'

const CowFeedingVideos = () => {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [playingVideo, setPlayingVideo] = useState(null)

  const mediaItems = [
    {
      id: 1,
      type: 'video',
      src: '/gao/1.mp4',
      title: language === 'en' ? 'Gau Sewa - Cow Feeding Session 1' : 'गौ सेवा - गायों को खिलाना सत्र 1',
      description: language === 'en' ? 'Weekly Gau Sewa session' : 'साप्ताहिक गौ सेवा सत्र'
    },
    {
      id: 2,
      type: 'video',
      src: '/gao/2.mp4',
      title: language === 'en' ? 'Gau Sewa - Cow Feeding Session 2' : 'गौ सेवा - गायों को खिलाना सत्र 2',
      description: language === 'en' ? 'Weekly Gau Sewa session' : 'साप्ताहिक गौ सेवा सत्र'
    },
    {
      id: 3,
      type: 'video',
      src: '/gao/3.mp4',
      title: language === 'en' ? 'Gau Sewa - Cow Feeding Session 3' : 'गौ सेवा - गायों को खिलाना सत्र 3',
      description: language === 'en' ? 'Weekly Gau Sewa session' : 'साप्ताहिक गौ सेवा सत्र'
    },
    {
      id: 4,
      type: 'video',
      src: '/pathvideos/11.mp4',
      title: language === 'en' ? 'Community Engagement Initiative' : 'समुदाय जुड़ाव पहल',
      description: language === 'en' ? 'Social Outreach Program' : 'सामाजिक आउटरीच कार्यक्रम'
    },
    {
      id: 5,
      type: 'video',
      src: '/pathvideos/22.mp4',
      title: language === 'en' ? 'Community Engagement Initiative' : 'समुदाय जुड़ाव पहल',
      description: language === 'en' ? 'Social Outreach Program' : 'सामाजिक आउटरीच कार्यक्रम'
    },
    {
      id: 6,
      type: 'video',
      src: '/pathvideos/33.mp4',
      title: language === 'en' ? 'Community Engagement Initiative' : 'समुदाय जुड़ाव पहल',
      description: language === 'en' ? 'Social Outreach Program' : 'सामाजिक आउटरीच कार्यक्रम'
    },
    {
      id: 7,
      type: 'image',
      src: '/school-winter-1.jpg',
      title: language === 'en' ? 'Food and Winter Cloth Distribution' : 'भोजन और सर्दियों के कपड़े वितरण',
      description: language === 'en' ? 'Distributing warm sweaters and nutritious food to school children' : 'स्कूली बच्चों को गर्म स्वेटर और पौष्टिक भोजन वितरित करना'
    },
    {
      id: 8,
      type: 'image',
      src: '/school-winter-2.jpg',
      title: language === 'en' ? 'Food and Winter Cloth Distribution' : 'भोजन और सर्दियों के कपड़े वितरण',
      description: language === 'en' ? 'Providing essential items to support children\'s education and well-being' : 'बच्चों की शिक्षा और कल्याण का समर्थन करने के लिए आवश्यक वस्तुएं प्रदान करना'
    },
    {
      id: 9,
      type: 'image',
      src: '/school-winter-3.jpg',
      title: language === 'en' ? 'Food and Winter Cloth Distribution' : 'भोजन और सर्दियों के कपड़े वितरण',
      description: language === 'en' ? 'Ensuring children stay warm and healthy during winter' : 'सर्दियों के दौरान बच्चों को गर्म और स्वस्थ रखना सुनिश्चित करना'
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
              ? 'Watch our weekly Gau Sewa (Cow Feeding) sessions and see our food and winter cloth distribution initiatives. See how your donations help us serve communities across Rajasthan.'
              : 'हमारे साप्ताहिक गौ सेवा (गायों को खिलाना) सत्र देखें और हमारी भोजन और सर्दियों के कपड़े वितरण पहल देखें। देखें कि कैसे आपके दान राजस्थान भर के समुदायों की सेवा करने में हमारी मदद करते हैं।'
            }
          </p>
        </motion.div>

        <motion.div
          className={styles.videosGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {mediaItems.map((item) => (
            <motion.div
              key={item.id}
              className={styles.videoCard}
              variants={videoVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {item.type === 'video' ? (
                <>
                  <div className={styles.videoContainer}>
                    <video
                      src={item.src}
                      controls
                      className={styles.video}
                      onPlay={() => handleVideoPlay(item.id)}
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
                    <h3 className={styles.videoTitle}>{item.title}</h3>
                    <p className={styles.videoDescription}>
                      {item.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.videoInfo}>
                    <h3 className={styles.videoTitle}>{item.title}</h3>
                    <p className={styles.videoDescription}>
                      {item.description}
                    </p>
                  </div>
                </>
              )}
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





