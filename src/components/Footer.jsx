import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const t = translations[language].footer

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{t.organizationName}</h3>
            <p className={styles.footerText}>
              {t.description}
            </p>
            <p className={styles.footerTagline}>
              {t.tagline}
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>{t.quickLinks}</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/about">{t.aboutUs}</Link></li>
              <li><Link to="/programs">{t.ourPrograms}</Link></li>
              <li><Link to="/impact">{t.ourImpact}</Link></li>
              <li><Link to="/get-involved">{t.getInvolved}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>{t.contact}</h4>
            <address className={styles.address}>
              <p>{t.addressLine1}</p>
              <p>{t.addressLine2}</p>
              <p>{t.operationalArea}: {t.operationalAreaText}</p>
            </address>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>{t.legal}</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/legal">{t.legalTransparency}</Link></li>
              <li><Link to="/contact">{t.contactUs}</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} {t.copyright}</p>
          <p className={styles.footerNote}>
            {t.registeredNote}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

