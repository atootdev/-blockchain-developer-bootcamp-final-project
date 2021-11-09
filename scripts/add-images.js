const Red = artifacts.require("SneakerTokenOne");
const Blue = artifacts.require("SneakerTokenTwo");
const White = artifacts.require("SneakerTokenThree");
const Zebra = artifacts.require("SneakerTokenFour");

var sneakerProps = [
  {
    "instance": Red,
    "image": "https://i.imgur.com/pcKn2GQ.png",
  },
  {
    "instance": Blue,
    "image": "https://i.imgur.com/OtC9rVb.jpg",
  },
  {
    "instance": White,
    "image": "https://i.imgur.com/frqeCIi.jpg",
  },
  {
    "instance": Zebra,
    "image": "https://i.imgur.com/xYkBVKr.jpg"
  }
];


module.exports = async function (callback) {
  // Deploy All Sneaker NFTs
  for(let i = 0; i < sneakerProps.length; i++) {
    let sneakerContract = sneakerProps[i]['instance']
    let tokenURI = sneakerProps[i]['image']
    let sneaker = await sneakerContract.deployed()
    await sneaker.setTokenURI(tokenURI)
  }
  console.log("TokenURI's Added To Sneakers!")
  callback()
};