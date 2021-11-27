const SneakerTokenOne = artifacts.require("SneakerTokenOne");
const SneakerTokenTwo = artifacts.require("SneakerTokenTwo");
const SneakerTokenThree = artifacts.require("SneakerTokenThree");
const SneakerTokenFour = artifacts.require("SneakerTokenFour");

var sneakerProps = [
  {
    "instance": SneakerTokenOne,
    "name": "Air Jordan 1 Off-White Retro High OG Chicago",
    "symbol": "OWAJR"
  },
  {
    "instance": SneakerTokenTwo,
    "name": "Air Jordan 1 Off-White Retro High OG UNC",
    "symbol": "OWAJB"
  },
  {
    "instance": SneakerTokenThree,
    "name": "Air Jordan 1 Off-White Retro High OG White",
    "symbol": "OWAJW"
  },
  {
    "instance": SneakerTokenFour,
    "name": "adidas Yeezy Boost 350 V2 Zebra",
    "symbol": "YZBA"
  }
];

module.exports = async function (deployer, accounts) {
  let sneakerContract;
  let sneakerName;
  let sneakerSymbol;
  // Deploy All Sneaker NFTs
  for(let i = 0; i < sneakerProps.length; i++) {
    sneakerContract = sneakerProps[i]['instance']
    sneakerName = sneakerProps[i]['name']
    sneakerSymbol = sneakerProps[i]['symbol']
    await deployer.deploy(sneakerContract, sneakerName, sneakerSymbol);
  }
};