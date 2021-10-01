//const SneakerToken = artifacts.require('SneakerToken')
const SneakerTest = artifacts.require('SneakerTest')

module.exports = function(deployer) {
  //deployer.deploy(SneakerToken, 'Mock_Yeezy_Zebra', 'YZB')
  deployer.deploy(SneakerTest, 'Mock_Yeezy_Zebra', 'YZB')
};