const Red = artifacts.require("SneakerTokenOne");
const Blue = artifacts.require("SneakerTokenTwo");
const White = artifacts.require("SneakerTokenThree");
const Zebra = artifacts.require("SneakerTokenFour");

const confirmationCodes = ["VgvVyFh0KFDuX8bX", "pTa9w2b61Ec2ocYJ", "DFUVYzqJtPExbES5", "CJHol0Ff3HlO3GMx"];
var sneakerArtifacts = [Red, Blue, White, Zebra];


module.exports = async function (callback) {
  let sneakerContract, sneaker;
  // Deploy All Sneaker NFTs
  for(let i = 0; i < sneakerArtifacts.length; i++) {
    sneakerContract = sneakerArtifacts[i]
    sneaker = await sneakerContract.deployed()
    await sneaker.addToConfList(confirmationCodes)
    }
  console.log("Confirmation Codes Added To Sneakers!")
  callback()
};