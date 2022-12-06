const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONT_END_ADDRESSES_FILE = "../polling-frontend/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../polling-frontend/constants/abi.json";

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("updating front end...");
    updateContractAddresses();
    updateAbi();
  }
};

async function updateContractAddresses() {
  const polling = await ethers.getContract("Polling");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE), "utf8");
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(polling.address)) {
      currentAddresses[chainId].push(polling.address);
    }
  } else {
    currentAddresses[chainId] = [polling.address];
  }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

async function updateAbi() {
  const polling = await ethers.getContract("Polling");
  fs.writeFileSync(FRONT_END_ABI_FILE, polling.interface.format(ethers.utils.FormatTypes.json));
}

module.exports.tags = ["all", "frontend"];
