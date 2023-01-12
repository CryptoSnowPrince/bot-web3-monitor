const ethers = require("ethers");
const ABI = require("./abi.json")

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org");
const address = "0xb7e9184502C3c883c28173A83b1291d7Ef2571bC"
const contract = new ethers.Contract(address, ABI, provider);
const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56"
const vntAddress = "0x2f053e33bd590830858161d42C67e9E8A9390019"
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
  }
]
const busd = new ethers.Contract(busdAddress, busdABI, provider)
const vnt = new ethers.Contract(vntAddress, busdABI, provider)

const run = async () => {
  const houseLeng = (await contract.allHousesLength()).toString();
  console.log(houseLeng)

  for (var i = 0; i < houseLeng; i++) {
    const houseI = (await contract.allHouses(i)).toString();
    console.log(houseI)
    var SYMBOL = "BNB:";
    const balance = await provider.getBalance(houseI);
    if(parseFloat(ethers.utils.formatEther(balance)) > 0.1) {
      SYMBOL = "BNB::"
    }
    console.log(SYMBOL, ethers.utils.formatEther(balance))
    const BUSDbalance = await busd.balanceOf(houseI);
    SYMBOL = "BUSD:"
    if(parseFloat(ethers.utils.formatEther(BUSDbalance)) > 50) {
      SYMBOL = "BUSD::"
    }
    console.log(SYMBOL, ethers.utils.formatEther(BUSDbalance))
    const VNTbalance = await vnt.balanceOf(houseI);
    SYMBOL = "VNT:"
    if(parseFloat(ethers.utils.formatEther(VNTbalance)) > 1000) {
      SYMBOL = "VNT::"
    }
    console.log(SYMBOL, ethers.utils.formatEther(VNTbalance))
  }
  console.log("bot is running");
}

run();