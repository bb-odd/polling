import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddresses, abi } from "../constants";
import { useNotification } from "web3uikit";

const CreatePoll = ({ handleChange }) => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const pollingAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const dispatch = useNotification();

  const [formData, setFormData] = useState({
    question: "",
    options: [],
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  });

  const {
    runContractFunction: createPoll,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: pollingAddress,
    functionName: "createPoll",
    params: {
      _question: formData.question,
      _options: formData.options,
    },
  });

  /* VIEW FUNCTIONS */
  const { runContractFunction: getPollIds } = useWeb3Contract({
    abi: abi,
    contractAddress: pollingAddress,
    functionName: "getIds",
    params: {},
  });

  async function updateUIValues() {
    const pollIds = await getPollIds();
    handleChange(pollIds);
  }

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      updateUIValues();
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const onOptionChange = (e) => {
    let options = formData.options;
    options[parseInt(e.target.name)] = e.target.value;
    setFormData(() => ({
      ...formData,
      ["options"]: options,
    }));
    console.log(typeof formData.question);
    console.log(Object.values(formData.options));
  };

  return (
    <div className={styles.createPoll}>
      <form className={styles.question}>
        <label>Question</label>
        <textarea type="text" name="question" onChange={onChangeHandler} required />
      </form>
      <div></div>
      <form>
        <label>Option 1:</label>
        <textarea type="text" name="0" onChange={onOptionChange} required />
      </form>
      <form>
        <label>Option 2:</label>
        <textarea type="text" name="1" onChange={onOptionChange} required />
      </form>
      <form>
        <label>Option 3:</label>
        <textarea type="text" name="2" onChange={onOptionChange} />
      </form>
      <form>
        <label>Option 4:</label>
        <textarea type="text" name="3" onChange={onOptionChange} />
      </form>
      <div className={styles.buttonDiv}>
        <button
          className={styles.submitButton}
          onClick={async () => {
            await createPoll({ onSuccess: handleSuccess, onError: (error) => console.log(error) });
          }}
          disabled={isLoading || isFetching}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePoll;
