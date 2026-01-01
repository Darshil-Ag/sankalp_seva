import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './DonationSection.module.css'

const DonationSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()
  const t = translations[language].donationSection
  const [selectedAmount, setSelectedAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState('')

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const amounts = [500, 1000, 2500, 5000]

  return (
    <section className={styles.donationSection} aria-label="Donation" ref={ref}>
      <div className="container">
        <motion.div 
          className={styles.donationCard}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.donationContent}>
            <motion.h2 
              className={styles.donationTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.title}
            </motion.h2>
            <motion.p 
              className={styles.donationText}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.description}
            </motion.p>
            
            <motion.form 
              className={styles.donationForm}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={(e) => {
                e.preventDefault()
                const finalAmount = customAmount || selectedAmount
                alert(`${t.thankYou} ₹${finalAmount}! ${t.contactToComplete}`)
              }}
            >
              <div className={styles.amountButtons}>
                {amounts.map((amount) => (
                  <motion.button
                    key={amount}
                    type="button"
                    className={`${styles.amountBtn} ${selectedAmount === amount ? styles.active : ''}`}
                    onClick={() => handleAmountClick(amount)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ₹{amount.toLocaleString()}
                  </motion.button>
                ))}
              </div>
              
              <div className={styles.customAmount}>
                <input
                  type="number"
                  placeholder={language === 'en' ? "Enter custom amount" : "कस्टम राशि दर्ज करें"}
                  className={styles.amountInput}
                  value={customAmount}
                  onChange={handleCustomChange}
                />
              </div>
              
              <motion.button
                type="submit"
                className={styles.donateButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.donateNow}
              </motion.button>
              
              <p className={styles.donationNote}>
                {t.securePayment}
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DonationSection
