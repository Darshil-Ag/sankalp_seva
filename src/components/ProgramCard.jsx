import { motion } from 'framer-motion'
import styles from './ProgramCard.module.css'

const ProgramCard = ({ title, description, icon, index = 0 }) => {
  return (
    <motion.div 
      className={styles.programCard}
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -120 : 120,
        scale: 0.95
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className={styles.programIcon}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}

      >
        {icon}
      </motion.div>

      <h3 className={styles.programTitle}>{title}</h3>
      <p className={styles.programDescription}>{description}</p>
    </motion.div>
  )
}

export default ProgramCard
