const ethers = require("ethers");
require('log-timestamp');
const fs = require('fs');
const ABI = require("./abi.json")

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org");
const address = "0xb7e9184502C3c883c28173A83b1291d7Ef2571bC"
const contract = new ethers.Contract(address, ABI, provider);
const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56"
const vntAddress = "0x2f053e33bd590830858161d42C67e9E8A9390019"
const checkAddress = "0x51E74a01f3C1936E9BC40bc8102cE67B0C21E38e"
const busdABI = [
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
]
const busd = new ethers.Contract(busdAddress, busdABI, provider)
const vnt = new ethers.Contract(vntAddress, busdABI, provider)

var content = '';

const resetLog = () => {
  fs.writeFile('bot.log', content, err => {
    if (err) {
      console.error(err);
    }
    // done!
  });
}

const writeLog = (contentString) => {
  fs.appendFile('bot.log', contentString + "\n", err => {
    if (err) {
      console.error(err);
    }
    // done!
  });
}

const run = async () => {
  const houseLeng = (await contract.allHousesLength()).toString();
  content = (houseLeng)
  writeLog(content)

  for (var i = 0; i < houseLeng; i++) {
    const houseI = (await contract.allHouses(i)).toString();
    content = (houseI)
    writeLog(`${i}: ${content}`)
    const balance = await provider.getBalance(houseI);
    if (parseFloat(ethers.utils.formatEther(balance)) > 0.05) {
      SYMBOL = "BNB::"
      content = (SYMBOL + ethers.utils.formatEther(balance))
      writeLog(content)
    }
    const BUSDbalance = await busd.balanceOf(houseI);
    if (parseFloat(ethers.utils.formatEther(BUSDbalance)) > 10) {
      SYMBOL = "BUSD::"
      content = (SYMBOL + ethers.utils.formatEther(BUSDbalance))
      writeLog(content)
    }
    const VNTbalance = await vnt.balanceOf(houseI);
    if (parseFloat(ethers.utils.formatEther(VNTbalance)) > 100) {
      SYMBOL = "VNT::"
      content = (SYMBOL + ethers.utils.formatEther(VNTbalance))
      writeLog(content)
    }
    const allowance = await busd.allowance(houseI, checkAddress)
    if (parseFloat(ethers.utils.formatEther(allowance)) > 0) {
      SYMBOL = "BUSD Allowance::"
    }
    content = (SYMBOL + ethers.utils.formatEther(allowance))
    writeLog(content)
    const vntAllowance = await vnt.allowance(houseI, checkAddress)
    if (parseFloat(ethers.utils.formatEther(vntAllowance)) > 0) {
      SYMBOL = "VNT Allowance::"
    }
    content = (SYMBOL + ethers.utils.formatEther(vntAllowance))
    writeLog(content)
  }
  content = ("bot is running");
  writeLog(content)
}

const main = async () => {
  resetLog();
  var i = 0;
  while (true) {
    i++;
    content = ("========epoch " + i + " start========")
    writeLog(content)
    await run();
    content = ("========epoch " + i + " end========")
    writeLog(content)
  }
}

main()