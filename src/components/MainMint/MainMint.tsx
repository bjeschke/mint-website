import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "../../RoboPunksNFT.json";
import "./MainMint.css";

const roboPunkNFTAddress = "0x5520989bf88eb2c1f07e4045a7e005b14fac59f9";

type MainMintProps = {
  accounts: string[];
  setAccounts: (newAccounts: string[]) => void;
};
const MainMint = ({ accounts, setAccounts }: MainMintProps) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunkNFTAddress,
        roboPunksNFT.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div className="main-mint">
      <h1>RoboPunks</h1>
      <p>
        Its 2073 and the RoboPunkt conquered the Earth. Get one RoboPunk NFT now
        to stop the invasion.
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button className="mint-now" onClick={handleMint}>
            Mint now
          </button>
        </div>
      ) : (
        <p>You must be connected to mint</p>
      )}
    </div>
  );
};

export default MainMint;
