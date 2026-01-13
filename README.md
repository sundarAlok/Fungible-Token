# 🪙 Fungible Token

A minimal **Solidity + HTML + Tailwind CSS decentralized application** that demonstrates wallet connection and token transfers using a custom ERC-20-like smart contract.  
Built for **hackathons and buildathons**, focusing on clarity, correctness, and on-chain logic.

---

## 🚀 Project Overview

**Fungible Token** allows users to:

- Connect their wallet using MetaMask  
- View their token balance  
- Transfer tokens to another address  
- Interact directly with a Solidity smart contract deployed on an EVM-compatible blockchain  

The project uses **pure Solidity for business logic** and **plain HTML + Tailwind CSS for UI**, with **minimal JavaScript only as a blockchain bridge**.

---

## 📁 Project Structure

mytoken-dapp/
│
├── contracts/
│ └── MyToken.sol # Solidity smart contract
│
├── frontend/
│ ├── index.html # HTML + Tailwind UI
│ └── app.js # Minimal wallet & contract bridge
│
└── README.md


---

## 🧾 Smart Contract

- Language: Solidity `^0.8.17`
- Features:
  - Token minting (owner-only)
  - Balance tracking
  - Token transfers
  - Total supply tracking

The contract must be deployed before using the frontend.

---

## 🔧 Deployment

You can deploy the contract using:

- Remix IDE
- Mantle Testnet
- Sepolia Testnet
- Local Hardhat / Anvil network

After deployment, update the contract address in:


---

## 🧪 How to Run the Project

1. Deploy `MyToken.sol`
2. Copy the deployed contract address
3. Paste it into `frontend/app.js`
4. Open `frontend/index.html` in a browser
5. Connect MetaMask
6. Interact with the smart contract

---

## 🛠 Tech Stack

- **Solidity** – Smart contract logic  
- **HTML** – Structure  
- **Tailwind CSS** – Styling  
- **ethers.js** – Blockchain interaction  
- **MetaMask** – Wallet provider  

---

## 🏆 Hackathon Ready

This project follows best practices for:
- Mantle Global Hackathon
- Surreal Buildathon
- ETHGlobal-style dApps
- Academic blockchain labs

---

## 📌 Notes

- Ensure MetaMask is installed
- Use the correct network
- Only the contract owner can mint tokens

---

## 📄 License

MIT License
