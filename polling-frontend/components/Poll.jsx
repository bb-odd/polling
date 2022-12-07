import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddresses, abi } from "../constants";
import styles from "../styles/Home.module.css";
import BigNumber from "bignumber.js";

const Poll = ({ id }) => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const pollingAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [poll, setPoll] = useState([]);
  const [voteIndex, setVoteIndex] = useState(0);

  useEffect(() => {
    updateUIValues();
  }, [isWeb3Enabled]);

  const { runContractFunction: vote } = useWeb3Contract({
    abi: abi,
    contractAddress: pollingAddress,
    functionName: "vote",
    params: { _voteIndex: voteIndex, _pollId: id },
  });

  /* VIEW FUNCTIONS */
  const { runContractFunction: getPoll } = useWeb3Contract({
    abi: abi,
    contractAddress: pollingAddress,
    functionName: "getPoll",
    params: { _pollId: id },
  });

  async function updateUIValues() {
    const pollResult = await getPoll();
    console.log(pollResult);
    setPoll(pollResult);
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

  const generatePoll = () => {
    let voteSum = 0;
    if (false)
      voteSum = poll[4].reduce((acc, value) => {
        return acc + value;
      }, 0);

    return (
      <div>
        {poll.length != 0 ? (
          <div>
            <label>{poll[1].toString()}</label>
            {poll[5].map((option, index) => (
              <div
                key={index}
                className={styles.optionDiv}
                onClick={async () => {
                  await vote({ onSuccess: handleSuccess, onError: (error) => console.log(error) });
                }}
              >
                <div
                  style={{
                    width: `${voteSum ? (poll[4][index] / voteSum) * 100 : 0}%`,
                  }}
                  className={styles.optionBar}
                ></div>
                <div className={styles.option}>
                  <label>{option}</label>
                  <label>{voteSum ? `${(poll[4] / voteSum) * 100}%` : "0%"}</label>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return <div>{generatePoll()}</div>;
};

export default Poll;
