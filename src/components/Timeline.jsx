import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./Timeline.module.css";

// Helper function to generate event ID from title
const generateEventId = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const Timeline = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    // Generate event ID or use provided ID
    const eventId = event.id || generateEventId(event.title);
    navigate(`/events/${eventId}`);
  };

  return (
    <div className={styles.timelineContainer}>

      {/* CENTER LINE – ONE TIME */}
      <div className={styles.timelineLine}></div>

      {events.map((event, index) => (
        <div key={index} className={styles.timelineItem}>

          {/* DOT – SAME PARENT AS LINE */}
          <motion.span
            className={styles.timelineDot}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          />

          {/* CARD - Now Clickable */}
          <motion.div
            className={`${styles.timelineContent} ${
              index % 2 === 0 ? styles.left : styles.right
            } ${styles.clickable}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => handleEventClick(event)}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.timelineDate}>{event.date}</div>
            <h3 className={styles.timelineTitle}>{event.title}</h3>
            <p className={styles.timelineDescription}>{event.description}</p>
            <div className={styles.viewDetails}>View Details →</div>
          </motion.div>

        </div>
      ))}
    </div>
  );
};

export default Timeline;
