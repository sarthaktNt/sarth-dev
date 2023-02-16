const Web3 = require("web3");
const abi = require("../artifacts/contracts/ourToken.sol/OurToken.json");
const contractAddr = "0xb2d1750FED6Cf785bd5c11F770f296a2BFd63865";
require("dotenv").config();
const contractObj = new ethers.Contract(contractAddr, abi.abi);

// Variables definition

let args = process.argv;
const privKey =
  process.env.PRIVATE_KEY ??
  "c20cbdcd9ba6a6944bae5d6dd2d82300daa9c1367b451b296b1f5c12ad9eaa5e"; //  private key
const addressFrom =
  process.env.SENDER_ADDRESS ?? "0x515094eECFdf2cC97aE7d90EAC3707b7fd40F13A";
const addressTo = args[2] ?? "0x399Cc2C916E3A15024A5900A9af39CE62379e357";
//const RPC_ENDPOINT = process.env.JSONRPC_URL ?? "HTTP://127.0.0.1:7545";
let AMOUNT = args[3] ?? "1";
const web3 = new Web3(RPC_ENDPOINT);
console.log(privKey, addressTo);
//Balance
contractObj
  .getBalance("0xaD55dBd40D3436C79842F8EAB6e9720ca878ad11")
  .then(function (wei) {
    const ethBalance = web3.utils.fromWei(wei, "ether");
    console.log(`Balance before sending ${ethBalance}`);
  });
// Create transaction
const deploy = async () => {
  console.log(
    `Attempting to make transaction from ${addressFrom} to ${addressTo}`
  );

  const createTransaction = await contractObj.accounts.signTransaction(
    {
      from: addressFrom,
      to: addressTo,
      value: contractObj.toWei("1", "ether"), // web3.utils.toWei(String(stuffPrice),'ether')
      gas: "21000",
    },
    privKey
  );
  console.log(createTransaction);
  // Deploy transaction
  const createReceipt = await contractObj.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(
    `Transaction successful with hash: ${createReceipt.transactionHash}`
  );
  contractObj
    .getBalance("0xaD55dBd40D3436C79842F8EAB6e9720ca878ad11")
    .then(function (wei) {
      const ethBalance = contractObj.fromWei(wei, "ether");
      console.log(`Balance after sending ${ethBalance}`);
    });
};


deploy();


//Scripts for showing the total supply and ETH balance

// Balance call
const balances = async () => {
  const balanceFrom = web3.utils.fromWei(
     await contractObj.getBalance(addressFrom),
     'ether'
  );
  const balanceTo = await web3.utils.fromWei(
     await contractObj.getBalance(addressTo),
     'ether'
  );

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH.`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} ETH.`);
};

balances();

//







