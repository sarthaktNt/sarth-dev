// const bip39 = require("bip39");
// const { ethers } = require("ethers");
// const config = require('../config')
// require("dotenv").config();

// // Variables definition

// let args = process.argv;

// const getSignerFunc = () => {
//   const mnemonic = bip39.generateMnemonic();
//   const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

//   const addressess = [];

//   for (let i = 0; i <= 1; i++) {
//     const derNode = hdNode.derivePath(`m/44'/1'/0'/${i}`);
//     const obj = {
//       address: derNode.address,
//       privateKey: derNode.privateKey,
//     };
//     addressess.push(obj);
//   }
 
// };



const ethers = require('ethers')
const wallet = ethers.Wallet.createRandom()
console.log('address:', wallet.address)
console.log('mnemonic:', wallet.mnemonic.phrase)
console.log('privateKey:', wallet.privateKey)

/*First address*/
// address: 0x99B5381a9B3924c78dEF405242Ba4669525e1727
// mnemonic: alley gown bargain chat fit will wheat among clarify warm pole access
// privateKey: 0x5022fdbbf459c69f83f5e8887d52ac8125fdbec6bdc8dd7974da1540b64462f4

/*Second address*/
// address: 0xeE1559e0038396D66874D9539d229ff852Bed79a
// mnemonic: royal pet tube palm mushroom force exotic comic truth ladder flavor mystery
// privateKey: 0x0052ed7bd57b67589db896058c2e4ff56cde0162f426f091ff859f23d7c4da38