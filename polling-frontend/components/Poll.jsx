import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const Poll = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const pollingAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [question, setQuestion] = useState("");
  const [owner, setOwner] = useState("");
  return <div></div>;
};

export default Poll;
