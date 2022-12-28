import React from "react";
import { ExternalProvider } from "@ethersproject/providers";
import "./NavBar.css";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

type NavBarProps = {
  accounts: string[];
  setAccounts: (newAccounts: string[]) => void;
};

const NavBar = ({ accounts, setAccounts }: NavBarProps) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <div className="navbar">
      <div className="left">
        <div>
          <div>
            <img src="../../assets/social-media-icons/facebook_32x32.png" />
          </div>
        </div>
        <div>Twitter</div>
        <div>Email</div>
      </div>

      <div className="right">
        <div>About</div>
        <div>Mint</div>
        <div>Team</div>

        {isConnected ? (
          <div className="connected">Connected</div>
        ) : (
          <button onClick={connectAccount}>Connect</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
