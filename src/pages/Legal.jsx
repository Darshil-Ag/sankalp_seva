import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Legal.module.css'

const Legal = () => {
  useEffect(() => {
    document.title = 'Legal & Transparency | Sankalp Sewa Sansthan Kishangarh'
  }, [])

  return (
    <div className={styles.legal}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.pageTitle}>Legal & Transparency</h1>
          <p className={styles.introText}>
            We are committed to operating with complete transparency and
            accountability in all our activities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>Registration Details</h2>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Organization Information</h3>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <strong>Organization Name:</strong> Sankalp Sewa Sansthan Kishangarh
                </div>
                <div className={styles.infoItem}>
                  <strong>Registered Office:</strong> A 25 BRAJ VILA NEAR SEVA KUNJ MANDIR AGARSEN NAGAR NEW WARD NO 18 MADANGANJ KISHANGARH
                </div>
                <div className={styles.infoItem}>
                  <strong>Operational Area:</strong> Entire State of Rajasthan
                </div>
                <div className={styles.infoItem}>
                  <strong>Organization Type:</strong> Non-profit, Non-political, Non-religious Social Service Organization
                </div>
                <div className={styles.infoItem}>
                  <strong>Registration Number:</strong> [Registration details placeholder]
                </div>
                <div className={styles.infoItem}>
                  <strong>Registration Date:</strong> [Date placeholder]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>Compliance & Transparency</h2>
            <div className={styles.textContent}>
              <p>
                Sankalp Sewa Sansthan Kishangarh operates in full compliance with all applicable
                laws and regulations governing non-profit organizations in India.
                We maintain detailed records of all our activities, financial
                transactions, and program implementations.
              </p>
              <p>
                Our commitment to transparency means that we are open about our
                operations, funding sources, and impact. We believe that trust is
                built through honest communication and accountable actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>Financial Transparency</h2>
            <div className={styles.textContent}>
              <p>
                We maintain transparent financial practices and ensure that all
                resources are used effectively to maximize social impact. Our
                financial records are maintained in accordance with applicable
                accounting standards and regulatory requirements.
              </p>
              <p>
                For detailed financial information, annual reports, or specific
                documentation, please contact us through our contact page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>Governance</h2>
            <div className={styles.textContent}>
              <p>
                Sankalp Sewa Sansthan Kishangarh is governed by a dedicated board and
                management team committed to our mission and values. All
                governance decisions are made with the best interests of the
                communities we serve in mind.
              </p>
              <p>
                We operate with clear policies and procedures, ensuring that
                all activities align with our organizational objectives and
                comply with legal and ethical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contentSection}>
            <h2 className={styles.sectionHeading}>Contact for Legal Inquiries</h2>
            <div className={styles.textContent}>
              <p>
                For any legal inquiries, documentation requests, or questions
                about our compliance and transparency practices, please contact
                us through our{' '}
                <Link to="/contact" className={styles.contactLink}>contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Legal

