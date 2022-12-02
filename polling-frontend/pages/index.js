import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.leftDiv}>
        <CreatePoll />
      </div>
      <div></div>
    </div>
  );
}
