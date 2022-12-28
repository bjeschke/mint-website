import { useState } from "react";
import React from "react";
import MainMint from "./components/MainMint/MainMint";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<string[]>([]);

  return (
    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;
