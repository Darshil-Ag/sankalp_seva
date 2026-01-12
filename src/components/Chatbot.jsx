import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Chatbot.module.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const { language } = useLanguage()
  const t = translations[language].chatbot

  const predefinedQuestions = [
    {
      question: t.questions.whatWork,
      answer: t.answers.whatWork
    },
    {
      question: t.questions.howDonate,
      answer: t.answers.howDonate
    },
    {
      question: t.questions.isActive,
      answer: t.answers.isActive
    },
    {
      question: t.questions.howVolunteer,
      answer: t.answers.howVolunteer
    },
    {
      question: t.questions.whereDonation,
      answer: t.answers.whereDonation
    },
    {
      question: t.questions.gauSewa,
      answer: t.answers.gauSewa
    },
    {
      question: t.questions.ladliGhar,
      answer: t.answers.ladliGhar
    }
  ]

  const handleQuestionClick = (questionObj) => {
    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: questionObj.question
    }
    setMessages(prev => [...prev, newMessage])

    // Simulate response delay for natural feel
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        type: 'bot',
        text: questionObj.answer
      }
      setMessages(prev => [...prev, response])
    }, 500)
  }

  const handleClose = () => {
    setIsOpen(false)
    setMessages([])
  }

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        className={styles.chatbotButton}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? '×' : (
          <motion.img 
            src="/sankalp_logo.jpg" 
            alt="Chatbot" 
            className={styles.chatbotButtonIcon}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatbotWindow}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className={styles.chatbotHeader}>
              <div className={styles.chatbotHeaderContent}>
                <div className={styles.chatbotIcon}>
                  <motion.img 
                    src="/sankalp_logo.jpg" 
                    alt="Sankalp Logo" 
                    className={styles.chatbotIconImage}
                    animate={{
                      scale: [1, 1.08, 1],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div>
                  <div className={styles.chatbotTitle}>{t.needHelp}</div>
                  <div className={styles.chatbotSubtitle}>{t.askAnything}</div>
                </div>
              </div>
              <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className={styles.chatbotMessages}>
              {messages.length === 0 ? (
                <motion.div
                  className={styles.welcomeMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={styles.welcomeIcon}>👋</div>
                  <div className={styles.welcomeText}>
                    {t.welcome}
                  </div>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`${styles.message} ${
                      message.type === 'user' ? styles.userMessage : styles.botMessage
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={styles.messageText}>{message.text}</div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Quick Questions */}
            <div className={styles.quickQuestions}>
              <div className={styles.quickQuestionsTitle}>{t.quickQuestions}</div>
              <div className={styles.questionsList}>
                {predefinedQuestions.map((q, index) => (
                  <motion.button
                    key={index}
                    className={styles.questionButton}
                    onClick={() => handleQuestionClick(q)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {q.question}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
