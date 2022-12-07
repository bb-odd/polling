import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";
import PollList from "../components/PollList";
import { useState } from "react";

export default function Home() {
  const [pollIds, setPollIds] = useState([]);

  const handleChange = (change) => {
    setPollIds(change);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.bottomDiv}>
        <div className={styles.leftDiv}>
          <CreatePoll handleChange={handleChange} />
        </div>
        <div className={styles.rightDiv}>
          <PollList ids={pollIds} />
        </div>
      </div>
    </div>
  );
}
