import { useNavigate } from "react-router-dom";
import styles from "./DonatePopup.module.css";

const DonatePopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleDonate = () => {
    onClose();          // popup band
    navigate("/donate"); // donate page open
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Support Gau Sewa 🐄</h2>

        <p>
          Your contribution helps us provide gur and chara to cows every Thursday.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.donate}
            onClick={handleDonate}
          >
            Donate Now
          </button>

          <button
            className={styles.close}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonatePopup;
