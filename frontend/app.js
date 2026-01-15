let provider, signer, userAddress;

// DOM refs
const networkList = document.getElementById("networkList");
const statusEl = document.getElementById("status");
const addBtn = document.getElementById("addNetworkBtn");
const addForm = document.getElementById("addNetworkForm");
const walletInfo = document.getElementById("walletInfo");
const walletAddressEl = document.getElementById("walletAddress");
const walletNetworkEl = document.getElementById("walletNetwork");
const transferCard = document.getElementById("transferCard");
const txStatus = document.getElementById("txStatus");

// Track added networks (to prevent duplicates)
const addedNetworks = new Set();

function format(v) {
  return Number(v).toFixed(6);
}

function getNetworkName(chainId) {
  const map = {
    1: "Ethereum Mainnet",
    11155111: "Sepolia Testnet",
    5000: "Mantle Mainnet",
    5001: "Mantle Testnet",
    5003: "Mantle Sepolia Testnet",
    295: "Hedera Mainnet",
    296: "Hedera Testnet"
  };
  return map[chainId] || `Unknown Network (${chainId})`;
}

function addRow(name, balance) {
  const li = document.createElement("li");
  li.className =
    "flex justify-between bg-gray-800 p-3 rounded-xl border border-gray-700";
  li.innerHTML = `<span>${name}</span><span class="text-green-400">${balance}</span>`;
  networkList.appendChild(li);
}

/* =======================
   WALLET CONNECTION
======================= */
async function connectWallet() {
  try {
    statusEl.innerText = "⏳ Connecting to MetaMask...";

    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    const net = await provider.getNetwork();
    const netName = getNetworkName(net.chainId);

    statusEl.innerText = "✅ Wallet connected";
    walletInfo.classList.remove("hidden");
    transferCard.classList.remove("hidden");
    addBtn.disabled = false;

    walletAddressEl.innerText = userAddress;
    walletNetworkEl.innerText = netName;

    // Clear & add default network
    networkList.innerHTML = "";
    addedNetworks.clear();

    const bal = await provider.getBalance(userAddress);
    addRow(`${netName} (Native)`, format(ethers.utils.formatEther(bal)));
    addedNetworks.add(netName);

  } catch (err) {
    console.error(err);
    statusEl.innerText = "❌ MetaMask connection failed";
  }
}

/* =======================
   ADD NETWORK (NO DUPLICATES + LOADING)
======================= */
addBtn.onclick = () => {
  addForm.classList.toggle("hidden");
};

async function addCustomNetwork() {
  const name = netName.value.trim();
  const rpc = netRpc.value.trim();
  if (!name || !rpc) return;

  // ❌ Prevent duplicate
  if (addedNetworks.has(name)) {
    alert("This network is already added");
    return;
  }

  // ⏳ Loading state (FORM ONLY)
  const btn = addForm.querySelector("button");
  btn.disabled = true;
  btn.innerText = "Loading...";

  try {
    const p = new ethers.providers.JsonRpcProvider(rpc);
    const bal = await p.getBalance(userAddress);

    addRow(name, format(ethers.utils.formatEther(bal)));
    addedNetworks.add(name);

    addForm.classList.add("hidden");
    netName.value = "";
    netRpc.value = "";
  } catch {
    alert("Invalid RPC or network unreachable");
  } finally {
    btn.disabled = false;
    btn.innerText = "Add Network";
  }
}

/* =======================
   TOKEN TRANSFER (WORKING)
======================= */
async function transferTokens() {
  const token = document.getElementById("tokenAddress").value.trim();
  const to = document.getElementById("to").value.trim();
  const amt = document.getElementById("amount").value.trim();

  if (!token || !to || !amt) {
    txStatus.innerText = "❌ Fill all fields";
    return;
  }

  try {
    txStatus.innerText = "⏳ Sending transaction...";

    const abi = [
      "function transfer(address,uint256) returns (bool)"
    ];

    const contract = new ethers.Contract(token, abi, signer);
    const tx = await contract.transfer(
      to,
      ethers.utils.parseUnits(amt, 18)
    );

    await tx.wait();
    txStatus.innerText = "✅ Transfer successful";
  } catch (err) {
    console.error(err);
    txStatus.innerText = "❌ Transfer failed (check contract address & balance)";
  }
}
