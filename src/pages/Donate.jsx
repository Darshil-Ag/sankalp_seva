import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import styles from "./Donate.module.css"

const Donate = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
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
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorPhone, setDonorPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

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

  const handleDonate = async () => {
    // Validation
    if (finalAmount <= 0 || isNaN(finalAmount)) {
      setError(t.errors?.invalidAmount || (language === 'en' ? 'Please enter a valid amount' : 'कृपया एक वैध राशि दर्ज करें'))
      return
    }

    if (finalAmount < 1) {
      setError(t.errors?.minDonation || (language === 'en' ? 'Minimum donation is ₹1' : 'न्यूनतम दान ₹1 है'))
      return
    }

    if (!donorName.trim()) {
      setError(language === 'en' ? 'Please enter your name' : 'कृपया अपना नाम दर्ज करें')
      return
    }

    if (!donorPhone.trim()) {
      setError(language === 'en' ? 'Please enter your phone number' : 'कृपया अपना फोन नंबर दर्ज करें')
      return
    }

    // Basic phone validation (10 digits minimum)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
    if (!phoneRegex.test(donorPhone.replace(/\s/g, ''))) {
      setError(language === 'en' ? 'Please enter a valid phone number' : 'कृपया एक वैध फोन नंबर दर्ज करें')
      return
    }

    setError("")
    setIsProcessing(true)

    try {
      // Convert amount to paise (multiply by 100)
      const amountInPaise = Math.round(finalAmount * 100)
      
      // Get Razorpay Key ID from environment variable
      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID
      if (!razorpayKeyId) {
        throw new Error('Razorpay Key ID not configured. Please set VITE_RAZORPAY_KEY_ID in .env file')
      }

      // Backend API URLs
      const BASE_API_URL = import.meta.env.VITE_API_URL?.replace('/api/verify-donation', '') || 'http://localhost:3001'
      const CREATE_ORDER_URL = `${BASE_API_URL}/api/create-order`
      const VERIFY_DONATION_URL = `${BASE_API_URL}/api/verify-donation`

      // Step 1: Create Razorpay order
      const orderResponse = await fetch(CREATE_ORDER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR'
        })
      })

      // Check if response is OK
      if (!orderResponse.ok) {
        const errorText = await orderResponse.text()
        console.error('Order creation failed:', {
          status: orderResponse.status,
          statusText: orderResponse.statusText,
          response: errorText.substring(0, 200)
        })
        throw new Error(
          language === 'en'
            ? `Server error (${orderResponse.status}). Please check if the backend server is running.`
            : `सर्वर त्रुटि (${orderResponse.status})। कृपया जांचें कि बैकएंड सर्वर चल रहा है।`
        )
      }

      // Check content type
      const contentType = orderResponse.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await orderResponse.text()
        console.error('Invalid response type:', {
          contentType,
          response: errorText.substring(0, 200)
        })
        throw new Error(
          language === 'en'
            ? 'Server returned invalid response. Please check if the backend server is running and accessible.'
            : 'सर्वर ने अमान्य प्रतिक्रिया दी। कृपया जांचें कि बैकएंड सर्वर चल रहा है और सुलभ है।'
        )
      }

      const orderData = await orderResponse.json()

      if (!orderData.success || !orderData.order) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      const orderId = orderData.order.id

      // Step 2: Open Razorpay checkout with the order
      const options = {
        key: razorpayKeyId,
        amount: amountInPaise,
        currency: 'INR',
        order_id: orderId, // Use the created order ID
        name: 'Sankalp Sewa Sansthan',
        description: `Donation for ${cause}`,
        handler: async function (response) {
          try {
            // Check if response is an error object
            if (response.error) {
              console.error('Razorpay error:', response.error)
              alert(language === 'en'
                ? `Payment error: ${response.error.description || response.error.message || 'Unknown error'}`
                : `भुगतान त्रुटि: ${response.error.description || response.error.message || 'अज्ञात त्रुटि'}`)
              setIsProcessing(false)
              return
            }
            
            // Extract payment details from response
            const paymentId = response.razorpay_payment_id
            const orderId = response.razorpay_order_id
            const signature = response.razorpay_signature
            
            // Validate required fields
            if (!paymentId || !orderId || !signature) {
              console.error('❌ Missing Razorpay response fields:', {
                paymentId: paymentId || 'MISSING',
                orderId: orderId || 'MISSING',
                signature: signature ? 'PRESENT' : 'MISSING',
                originalResponse: response,
                actualResponse: actualResponse,
                responseKeys: Object.keys(response),
                actualResponseKeys: Object.keys(actualResponse)
              })
              
              // Show detailed error to help debug
              const errorDetails = `Response structure:\n${JSON.stringify(response, null, 2).substring(0, 500)}`
              console.error('Full response structure:', errorDetails)
              
              alert(language === 'en'
                ? `Payment completed but verification data is missing.\n\nPlease check browser console (F12) for details.\n\nIf payment was successful, contact support with payment ID: ${paymentId || 'N/A'}`
                : `भुगतान पूर्ण हो गया लेकिन सत्यापन डेटा गायब है।\n\nकृपया ब्राउज़र कंसोल (F12) जांचें।\n\nयदि भुगतान सफल था, तो समर्थन से संपर्क करें: ${paymentId || 'N/A'}`)
              setIsProcessing(false)
              return
            }
            
            // Validate donor information
            const trimmedDonorName = donorName.trim()
            const trimmedDonorPhone = donorPhone.trim()
            
            if (!trimmedDonorName || !trimmedDonorPhone) {
              console.error('Missing donor information:', {
                donorName: trimmedDonorName || 'MISSING',
                donorPhone: trimmedDonorPhone || 'MISSING'
              })
              alert(language === 'en'
                ? 'Donor information is missing. Please try again.'
                : 'दानकर्ता की जानकारी गायब है। कृपया पुनः प्रयास करें।')
              setIsProcessing(false)
              return
            }
            
            // Prepare request body
            const requestBody = {
              payment_id: paymentId,
              order_id: orderId,
              signature: signature,
              amount: amountInPaise,
              currency: 'INR',
              donor_name: trimmedDonorName,
              donor_email: donorEmail.trim() || null,
              donor_phone: trimmedDonorPhone,
              cause: cause,
            }
            
            console.log('Verifying donation with backend...')
            
            // Call backend to verify and record donation
            const verifyResponse = await fetch(VERIFY_DONATION_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody)
            })

            // Check if response is OK
            if (!verifyResponse.ok) {
              const errorText = await verifyResponse.text()
              console.error('Verification failed:', {
                status: verifyResponse.status,
                statusText: verifyResponse.statusText,
                response: errorText.substring(0, 200)
              })
              throw new Error(
                language === 'en'
                  ? `Verification failed (${verifyResponse.status}). Please contact support.`
                  : `सत्यापन विफल (${verifyResponse.status})। कृपया समर्थन से संपर्क करें।`
              )
            }

            // Check content type
            const contentType = verifyResponse.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
              const errorText = await verifyResponse.text()
              console.error('Invalid response type:', {
                contentType,
                response: errorText.substring(0, 200)
              })
              throw new Error(
                language === 'en'
                  ? 'Server returned invalid response. Please contact support.'
                  : 'सर्वर ने अमान्य प्रतिक्रिया दी। कृपया समर्थन से संपर्क करें।'
              )
            }

            const data = await verifyResponse.json()

            if (data.success && data.donation) {
              // Payment verified successfully - redirect to success page with donation details
              const successParams = new URLSearchParams({
                payment_id: paymentId,
                order_id: orderId,
                donor_name: trimmedDonorName,
                donor_email: trimmedDonorEmail,
                amount: amountInPaise.toString(),
                created_at: data.donation.created_at || new Date().toISOString()
              })
              
              navigate(`/donation-success?${successParams.toString()}`)
            } else {
              // Verification failed - redirect to failure page
              const failureParams = new URLSearchParams({
                error: data.error || (language === 'en' ? 'Payment verification failed' : 'भुगतान सत्यापन विफल'),
                payment_id: paymentId || ''
              })
              
              navigate(`/donation-failed?${failureParams.toString()}`)
            }
          } catch (error) {
            console.error('Error verifying donation:', error)
            // Network or other errors - redirect to failure page
            const failureParams = new URLSearchParams({
              error: language === 'en' 
                ? 'An error occurred while verifying your payment. Please contact support.'
                : 'आपके भुगतान को सत्यापित करते समय एक त्रुटि हुई। कृपया समर्थन से संपर्क करें।',
              payment_id: paymentId || ''
            })
            
            navigate(`/donation-failed?${failureParams.toString()}`)
          } finally {
            setIsProcessing(false)
          }
        },
        prefill: {
          name: donorName.trim(),
          email: donorEmail.trim() || undefined,
          contact: donorPhone.trim()
        },
        theme: {
          color: '#2E7D32' // Match your site's primary green color
        },
        modal: {
          ondismiss: function() {
            // User closed the payment modal
            setIsProcessing(false)
            console.log('Payment cancelled by user')
          }
        }
      }

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      
      // Handle payment failure
      razorpay.on('payment.failed', function (response) {
        setIsProcessing(false)
        console.error('Payment failed:', response.error)
        
        // Redirect to failure page
        const failureParams = new URLSearchParams({
          error: response.error?.description || response.error?.message || (language === 'en' ? 'Payment failed' : 'भुगतान विफल'),
          payment_id: response.error?.metadata?.payment_id || ''
        })
        
        navigate(`/donation-failed?${failureParams.toString()}`)
      })

      razorpay.open()
    } catch (error) {
      console.error('Error in payment process:', error)
      setError(language === 'en' 
        ? error.message || 'Failed to initialize payment. Please try again.'
        : error.message || 'भुगतान प्रारंभ करने में विफल। कृपया पुनः प्रयास करें।')
      setIsProcessing(false)
    }
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

        {/* Donor Information */}
        <div className={styles.section}>
          <label className={styles.label}>{language === 'en' ? 'Your Name' : 'आपका नाम'} *</label>
          <input
            type="text"
            placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
            value={donorName}
            onChange={(e) => {
              setDonorName(e.target.value)
              setError("")
            }}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{language === 'en' ? 'Your Phone' : 'आपका फोन'} *</label>
          <input
            type="tel"
            placeholder={language === 'en' ? 'Enter your phone number' : 'अपना फोन नंबर दर्ज करें'}
            value={donorPhone}
            onChange={(e) => {
              setDonorPhone(e.target.value)
              setError("")
            }}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{language === 'en' ? 'Your Email (Optional)' : 'आपका ईमेल (वैकल्पिक)'}</label>
          <input
            type="email"
            placeholder={language === 'en' ? 'Enter your email address' : 'अपना ईमेल पता दर्ज करें'}
            value={donorEmail}
            onChange={(e) => {
              setDonorEmail(e.target.value)
              setError("")
            }}
            className={styles.input}
          />
        </div>

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
          disabled={finalAmount <= 0 || !!error || isProcessing || !donorName.trim() || !donorPhone.trim()}
          whileHover={{ scale: finalAmount > 0 && !error && !isProcessing ? 1.02 : 1 }}
          whileTap={{ scale: finalAmount > 0 && !error && !isProcessing ? 0.98 : 1 }}
        >
          {isProcessing 
            ? (language === 'en' ? 'Processing...' : 'प्रसंस्करण...')
            : `${t.donateBtn} ₹${finalAmount > 0 ? finalAmount : ""}`
          }
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
