import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum)
} else if (window.web3) {
  web3 = new web3(window.web3.currentProiver)
} else {

  //for Ganache
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");

  web3 = new Web3(provider);
}

export default web3;

