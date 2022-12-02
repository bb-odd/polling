import { ConnectButton } from "web3uikit";
import styles from "../styles/Home.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Decentralised polls</h1>
      <div className={styles.bottomHeader}>
        <div className={styles.connectButton}>
          <ConnectButton moralisAuth={false} />
        </div>

        <div className={styles.tabs}>
          <div className={styles.tab}>All Polls</div>
          <div className={styles.tab}>Your Polls</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
