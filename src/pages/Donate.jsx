import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import styles from "./Donate.module.css"

const Donate = () => {
  const { language } = useLanguage()
  const t = translations[language].donate
  
  const causes = [
    t.causes.gauSewa,
    t.causes.ladliGhar,
    t.causes.childEducation,
    t.causes.healthcare,
    t.causes.womenEmpowerment,
    t.causes.general
  ]

  // Impact messages based on amount
  const getImpactMessage = (amount) => {
    if (amount >= 1000) {
      return t.impact1000
    } else if (amount >= 500) {
      return t.impact500
    } else if (amount >= 100) {
      return t.impact100
    }
    return t.impactDefault
  }

  const [amount, setAmount] = useState(501)
  const [customAmount, setCustomAmount] = useState("")
  const [cause, setCause] = useState(causes[0])
  const [monthly, setMonthly] = useState(false)
  const [error, setError] = useState("")

  const finalAmount = Number(customAmount || amount)

  const handleCustomAmount = (e) => {
    const value = e.target.value

    if (value === "") {
      setCustomAmount("")
      setError("")
      return
    }

    const numValue = Number(value)
    if (numValue <= 0) {
      setError(t.errors.minAmount)
    } else if (numValue < 1) {
      setError(t.errors.minDonation)
    } else {
      setError("")
    }

    setCustomAmount(value)
  }

  const handleDonate = () => {
    if (finalAmount <= 0 || isNaN(finalAmount)) {
      setError(t.errors.invalidAmount)
      return
    }

    if (finalAmount < 1) {
      setError(t.errors.minDonation)
      return
    }

    const typeText = monthly 
      ? (language === 'en' ? "Monthly" : "मासिक")
      : (language === 'en' ? "One-time" : "एक बार")
    
    const alertText = language === 'en'
      ? `Donation Details:\n\nCause: ${cause}\nAmount: ₹${finalAmount}\nType: ${typeText}\n\n(Payment gateway will open here)`
      : `दान विवरण:\n\nकारण: ${cause}\nराशि: ₹${finalAmount}\nप्रकार: ${typeText}\n\n(भुगतान गेटवे यहाँ खुलेगा)`

    alert(alertText)
  }

  const presetAmounts = [101, 501, 1000]

  return (
    <div className={styles.donatePage}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{t.title}</h1>

        <p className={styles.subtitle}>
          {t.subtitle}
        </p>

        {/* Cause */}
        <div className={styles.section}>
          <label className={styles.label}>{t.selectCause}</label>
          <select
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            className={styles.select}
          >
            {causes.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className={styles.section}>
          <label className={styles.label}>{t.chooseAmount}</label>

          <div className={styles.amounts}>
            {presetAmounts.map((amt) => (
              <motion.button
                key={amt}
                className={amount === amt && !customAmount ? styles.active : styles.amountButton}
                onClick={() => {
                  setAmount(amt)
                  setCustomAmount("")
                  setError("")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ₹{amt}
              </motion.button>
            ))}
            <motion.button
              className={customAmount ? styles.active : styles.amountButton}
              onClick={() => {
                setCustomAmount("")
                setError("")
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.custom}
            </motion.button>
          </div>

          <input
            type="number"
            min="1"
            step="1"
            placeholder={t.enterAmount}
            value={customAmount}
            onChange={handleCustomAmount}
            className={styles.input}
          />

          {error && <p className={styles.error}>{error}</p>}

          {/* Impact Message */}
          {!error && finalAmount > 0 && (
            <motion.div
              className={styles.impactMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.impactIcon}>✨</span>
              <span className={styles.impactText}>{getImpactMessage(finalAmount)}</span>
            </motion.div>
          )}
        </div>

        {/* Monthly */}
        <div className={styles.sectionRow}>
          <input
            type="checkbox"
            id="monthly"
            checked={monthly}
            onChange={() => setMonthly(!monthly)}
            className={styles.checkbox}
          />
          <label htmlFor="monthly" className={styles.checkboxLabel}>
            {t.monthlyDonation}
          </label>
        </div>

        {/* Donate */}
        <motion.button
          className={styles.donateBtn}
          onClick={handleDonate}
          disabled={finalAmount <= 0 || !!error}
          whileHover={{ scale: finalAmount > 0 && !error ? 1.02 : 1 }}
          whileTap={{ scale: finalAmount > 0 && !error ? 0.98 : 1 }}
        >
          {t.donateBtn} ₹{finalAmount > 0 ? finalAmount : ""}
        </motion.button>

        <p className={styles.trust}>
          {t.securePayment}
        </p>

        {/* Post-Donation Steps */}
        <motion.div
          className={styles.postDonationSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={styles.postDonationTitle}>{t.postDonationTitle}</h2>
          <div className={styles.stepsList}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{t.step1Title}</div>
                <div className={styles.stepDescription}>
                  {t.step1Desc}
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{t.step2Title}</div>
                <div className={styles.stepDescription}>
                  {t.step2Desc}
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{t.step3Title}</div>
                <div className={styles.stepDescription}>
                  {t.step3Desc}
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{t.step4Title}</div>
                <div className={styles.stepDescription}>
                  {t.step4Desc}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Donate
