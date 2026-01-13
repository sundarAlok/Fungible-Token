const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";

const ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)"
];

let provider, signer, contract, userAddress;

const statusEl = document.getElementById("status");
const walletEl = document.getElementById("walletAddress");
const balanceEl = document.getElementById("balance");

/**
 * 1️⃣ Detect MetaMask
 * 2️⃣ Connect if available
 * 3️⃣ Show clear error if not
 */
async function connectWallet() {
  if (!window.ethereum) {
    statusEl.innerText =
      "❌ Please add MetaMask extension and create a wallet on it, then try to connect the wallet.";
    return;
  }

  try {
    statusEl.innerText = "⏳ Connecting to MetaMask...";

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    walletEl.innerText = `Connected: ${userAddress}`;
    statusEl.innerText = "✅ Wallet connected successfully";

    loadBalance();
  } catch (error) {
    console.error(error);
    statusEl.innerText = "❌ Wallet connection failed";
  }
}

/**
 * Load user balance
 */
async function loadBalance() {
  const bal = await contract.balanceOf(userAddress);
  balanceEl.innerText = ethers.utils.formatUnits(bal, 18);
}

/**
 * Transfer tokens
 */
async function transferTokens() {
  const to = document.getElementById("to").value;
  const amt = document.getElementById("amount").value;

  if (!to || !amt) {
    statusEl.innerText = "⚠️ Enter recipient and amount";
    return;
  }

  try {
    statusEl.innerText = "⏳ Transaction in progress...";

    const tx = await contract.transfer(
      to,
      ethers.utils.parseUnits(amt, 18)
    );
    await tx.wait();

    statusEl.innerText = "✅ Transfer successful";
    loadBalance();
  } catch (err) {
    console.error(err);
    statusEl.innerText = "❌ Transaction failed";
  }
}
