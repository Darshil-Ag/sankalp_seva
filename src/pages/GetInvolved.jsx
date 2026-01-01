import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './GetInvolved.module.css'

const GetInvolved = () => {
  const { language } = useLanguage()
  const t = translations[language].getInvolved

  useEffect(() => {
    document.title = `${t.pageTitle} | Sankalp Sewa Sansthan Kishangarh`
  }, [t.pageTitle])

  const opportunities = [
    {
      title: t.volunteerOpportunities,
      description: t.volunteerDesc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: t.communityParticipation,
      description: t.communityDesc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      title: t.awarenessCampaigns,
      description: t.awarenessDesc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      )
    },
    {
      title: t.partnerships,
      description: t.partnershipsDesc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )
    }
  ]

  return (
    <div className={styles.getInvolved}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
          <p className={styles.introText}>
            {t.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.opportunitiesGrid}>
            {opportunities.map((opportunity, index) => (
              <div key={index} className={styles.opportunityCard}>
                <div className={styles.opportunityIcon}>{opportunity.icon}</div>
                <h3 className={styles.opportunityTitle}>{opportunity.title}</h3>
                <p className={styles.opportunityDescription}>{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.contactSection}>
            <h2 className={styles.sectionHeading}>{t.howToGetStarted}</h2>
            <div className={styles.stepsList}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{t.reachOut}</h3>
                  <p className={styles.stepDescription}>
                    {t.reachOutDesc}
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{t.findYourFit}</h3>
                  <p className={styles.stepDescription}>
                    {t.findFitDesc}
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{t.makeAnImpact}</h3>
                  <p className={styles.stepDescription}>
                    {t.makeImpactDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.callToAction}>
            <h2 className={styles.ctaTitle}>{t.readyToMakeDifference}</h2>
            <p className={styles.ctaText}>
              {t.readyDesc}
            </p>
            <Link to="/contact" className="btn btn-primary">
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetInvolved


