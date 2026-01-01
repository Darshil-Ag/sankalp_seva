import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Contact.module.css'

const Contact = () => {
  const { language } = useLanguage()
  const t = translations[language].contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    document.title = `${t.pageTitle} | Sankalp Sewa Sansthan Kishangarh`
  }, [t.pageTitle])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend only - no actual submission
    alert(t.thankYouMessage)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className={styles.contact}>
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
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionHeading}>{t.getInTouch}</h2>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>{t.registeredOffice}</h3>
                <address className={styles.address}>
                  <p>{t.addressLine1}</p>
                  <p>{t.addressLine2}</p>
                </address>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>{t.operationalArea}</h3>
                <p className={styles.infoText}>{t.operationalAreaText}</p>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>{t.contactInformation}</h3>
                <p className={styles.infoText}>
                  <strong>{t.phone}:</strong> {t.phonePlaceholder}
                </p>
                <p className={styles.infoText}>
                  <strong>{t.email}:</strong> {t.emailPlaceholder}
                </p>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2 className={styles.sectionHeading}>{t.sendMessage}</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    {t.name} <span className={styles.required}>{t.required}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder={t.namePlaceholder}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    {t.email} <span className={styles.required}>{t.required}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder={t.emailPlaceholderInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder={t.phonePlaceholderInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    {t.subject} <span className={styles.required}>{t.required}</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder={t.subjectPlaceholder}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    {t.message} <span className={styles.required}>{t.required}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className={styles.textarea}
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  {t.sendMessageBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact

