import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Impact.module.css'

const Impact = () => {
  const { language } = useLanguage()
  const t = translations[language].impact

  useEffect(() => {
    document.title = `${t.pageTitle} | Sankalp Sewa Sansthan Kishangarh`
  }, [t.pageTitle])

  return (
    <div className={styles.impact}>
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
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>{t.stateWideReach}</h2>
            <div className={styles.textContent}>
              <p>
                {t.stateWideDesc1}
              </p>
              <p>
                {t.stateWideDesc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>{t.communityFocused}</h2>
            <div className={styles.textContent}>
              <p>
                {t.communityDesc1}
              </p>
              <p>
                {t.communityDesc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>{t.longTermChange}</h2>
            <div className={styles.textContent}>
              <p>
                {t.longTermDesc1}
              </p>
              <p>
                {t.longTermDesc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>{t.transparency}</h2>
            <div className={styles.textContent}>
              <p>
                {t.transparencyDesc1}
              </p>
              <p>
                {t.transparencyDesc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.callToAction}>
            <h2 className={styles.ctaTitle}>{t.bePartOfImpact}</h2>
            <p className={styles.ctaText}>
              {t.bePartDesc}
            </p>
            <Link to="/get-involved" className="btn btn-primary">
              {translations[language].common.getInvolved}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Impact

