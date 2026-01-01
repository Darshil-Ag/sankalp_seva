import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import styles from "./DonationFailed.module.css"

const DonationFailed = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [errorData, setErrorData] = useState(null)

  useEffect(() => {
    // Get error data from URL parameters
    const error = searchParams.get('error')
    const paymentId = searchParams.get('payment_id')

    setErrorData({
      error: error || (language === 'en' ? 'Payment verification failed' : 'भुगतान सत्यापन विफल'),
      paymentId: paymentId || null
    })
  }, [searchParams, language])

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Error Icon */}
        <div className={styles.iconContainer}>
          <motion.div
            className={styles.errorIcon}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            ✕
          </motion.div>
        </div>

        {/* Error Message */}
        <h1 className={styles.title}>
          {language === 'en' ? 'Payment Verification Failed' : 'भुगतान सत्यापन विफल'}
        </h1>

        <p className={styles.subtitle}>
          {language === 'en'
            ? 'We were unable to verify your payment. Please try again or contact support if the issue persists.'
            : 'हम आपके भुगतान को सत्यापित करने में असमर्थ थे। कृपया पुनः प्रयास करें या यदि समस्या बनी रहती है तो समर्थन से संपर्क करें।'}
        </p>

        {/* Error Details */}
        {errorData && (
          <div className={styles.errorCard}>
            <p className={styles.errorMessage}>
              <strong>{language === 'en' ? 'Error:' : 'त्रुटि:'}</strong> {errorData.error}
            </p>
            {errorData.paymentId && (
              <p className={styles.paymentId}>
                <strong>{language === 'en' ? 'Payment ID:' : 'भुगतान आईडी:'}</strong> {errorData.paymentId}
              </p>
            )}
          </div>
        )}

        {/* Help Text */}
        <div className={styles.helpText}>
          <p>
            {language === 'en'
              ? 'If your payment was deducted from your account, please contact our support team with your payment ID and we will resolve this immediately.'
              : 'यदि आपके खाते से भुगतान कट गया है, तो कृपया अपने भुगतान आईडी के साथ हमारी सहायता टीम से संपर्क करें और हम इसे तुरंत हल कर देंगे।'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <motion.button
            className={styles.primaryButton}
            onClick={() => navigate('/donate')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
          </motion.button>

          <motion.button
            className={styles.secondaryButton}
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Contact Support' : 'समर्थन से संपर्क करें'}
          </motion.button>

          <motion.button
            className={styles.tertiaryButton}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Back to Home' : 'होम पर वापस जाएं'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default DonationFailed

