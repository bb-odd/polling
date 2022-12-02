import styles from "../styles/Home.module.css";

const CreatePoll = () => {
  return (
    <div className={styles.createPoll}>
      <form className={styles.question}>
        <label>Question</label>
        <textarea type="text" required />
      </form>
      <div></div>
      <form>
        <label>Option 1:</label>
        <textarea type="text" required />
      </form>
      <form>
        <label>Option 2:</label>
        <textarea type="text" required />
      </form>
      <form>
        <label>Option 3:</label>
        <textarea type="text" />
      </form>
      <form>
        <label>Option 4:</label>
        <textarea type="text" />
      </form>
      <div className={styles.buttonDiv}>
        <button className={styles.submitButton}>Submit</button>
      </div>
    </div>
  );
};

export default CreatePoll;
