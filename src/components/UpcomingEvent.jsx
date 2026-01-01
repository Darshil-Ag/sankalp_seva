import { useMemo, useState } from "react";
import DonatePopup from "./DonatePopup";
import styles from "./UpcomingEvent.module.css";

const getNextThursday = () => {
  const today = new Date();
  const day = today.getDay(); // Sunday = 0
  const diff = (4 + 7 - day) % 7 || 7; // Thursday = 4
  const next = new Date(today);
  next.setDate(today.getDate() + diff);
  return next.toDateString();
};

const UpcomingEvent = () => {
  const [showDonate, setShowDonate] = useState(false);
  const nextDate = useMemo(() => getNextThursday(), []);

  return (
    <>
      <div className={styles.eventCard}>
        <h3 className={styles.title}>🐄 Upcoming Sewa</h3>

        <p className={styles.eventName}>
          Gau Sewa – Gur & Chara Distribution
        </p>

        <p className={styles.date}>
          📅 {nextDate}
        </p>

        <p className={styles.desc}>
          Every Thursday, Sankalp Sewa Sansthan Kishangarh provides gur and nutritious chara
          to cows as part of our Gau Sewa initiative.
        </p>

        <button
          className={styles.donateBtn}
          onClick={() => setShowDonate(true)}
        >
          Donate for this Sewa
        </button>
      </div>

      {showDonate && (
        <DonatePopup onClose={() => setShowDonate(false)} />
      )}
    </>
  );
};

export default UpcomingEvent;
