import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import styles from "./DonationSuccess.module.css"

const DonationSuccess = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [donationData, setDonationData] = useState(null)

  useEffect(() => {
    // Get donation data from URL parameters (passed from Donate page)
    const paymentId = searchParams.get('payment_id')
    const orderId = searchParams.get('order_id')
    const donorName = searchParams.get('donor_name')
    const donorEmail = searchParams.get('donor_email')
    const amount = searchParams.get('amount')
    const createdAt = searchParams.get('created_at')

    if (!paymentId || !orderId) {
      // If required data is missing, redirect to donate page
      navigate('/donate')
      return
    }

    setDonationData({
      paymentId,
      orderId,
      donorName: donorName || 'Donor',
      donorEmail: donorEmail || '',
      amount: amount ? parseInt(amount) : 0,
      createdAt: createdAt || new Date().toISOString()
    })
  }, [searchParams, navigate])

  const formatAmount = (amountInPaise) => {
    return `₹${(amountInPaise / 100).toLocaleString('en-IN')}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString(language === 'en' ? 'en-IN' : 'hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!donationData) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <motion.div
            className={styles.successIcon}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
        </div>

        {/* Thank You Message */}
        <h1 className={styles.title}>
          {language === 'en' ? 'Thank You for Your Donation!' : 'आपके दान के लिए धन्यवाद!'}
        </h1>

        <p className={styles.subtitle}>
          {language === 'en' 
            ? 'Your contribution helps us make a difference in the lives of many.'
            : 'आपका योगदान हमें कई लोगों के जीवन में बदलाव लाने में मदद करता है।'}
        </p>

        {/* Donation Details Card */}
        <div className={styles.detailsCard}>
          <h2 className={styles.detailsTitle}>
            {language === 'en' ? 'Donation Details' : 'दान विवरण'}
          </h2>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {language === 'en' ? 'Donor Name' : 'दानकर्ता का नाम'}
              </span>
              <span className={styles.detailValue}>{donationData.donorName}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {language === 'en' ? 'Donation Amount' : 'दान राशि'}
              </span>
              <span className={styles.detailValue}>{formatAmount(donationData.amount)}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {language === 'en' ? 'Transaction ID' : 'लेनदेन आईडी'}
              </span>
              <span className={styles.detailValue}>{donationData.paymentId}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {language === 'en' ? 'Order ID' : 'ऑर्डर आईडी'}
              </span>
              <span className={styles.detailValue}>{donationData.orderId}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {language === 'en' ? 'Payment Status' : 'भुगतान स्थिति'}
              </span>
              <span className={`${styles.detailValue} ${styles.statusSuccess}`}>
                {language === 'en' ? 'Success' : 'सफल'}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {language === 'en' ? 'Date & Time' : 'दिनांक और समय'}
              </span>
              <span className={styles.detailValue}>{formatDate(donationData.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className={styles.orgInfo}>
          <p className={styles.orgName}>Sankalp Sewa Sansthan</p>
          <p className={styles.orgMessage}>
            {language === 'en'
              ? 'A receipt has been sent to your email address. Thank you for your generous support!'
              : 'आपके ईमेल पते पर एक रसीद भेजी गई है। आपके उदार समर्थन के लिए धन्यवाद!'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <motion.button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Back to Home' : 'होम पर वापस जाएं'}
          </motion.button>

          <motion.button
            className={styles.secondaryButton}
            onClick={() => navigate('/donate')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'en' ? 'Donate Again' : 'फिर से दान करें'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default DonationSuccess



