const { assert } = require('chai');

const SneakerTest = artifacts.require('SneakerTest');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SneakerTest', async accounts => {
  let contract

  before(async () => {
    contract = await SneakerTest.deployed()
  })

  describe('Sneaker Deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Mock_Yeezy_Zebra')
    })
  })

  describe('testing sneaker contract functions', async () => {
    let confList
    it('can add confirmation numbers to list', async () => {
      confList = ['xPNzTSthMggerKQA','QaCAcbdmTxfwKxmA','KdcDRKxvXyXyaxKN'];
      await contract.addToConfList(confList)
      let active = await contract.sNumberActive('xPNzTSthMggerKQA')
      assert.equal(active.toString(), 'true', 'Confirmation list has been created')
    })
    it('can only be accessed by the owner', async() => {
      //Ensure only owner can add Confirmation Numbers to the list
      await contract.addToConfList(confList, { from: accounts[1] }).should.be.rejected;
    })
    it('can make the contract active', async () => {
      await contract.setIsActive(true)
      const active = await contract.isActive()
      assert.equal(active.toString(), 'true', 'Contract is active')
    })
    it('can mint new tokens', async () => {
      const result = await contract.mint('xPNzTSthMggerKQA')
      const totalSupply = await contract.totalSupply()
      assert.equal(totalSupply, 1, 'total supply of tokens is 1')
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'token id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from address is correct')
      assert.equal(event.to, accounts[0], 'to address is correct')

      //Ensure only correct confirmation codes can mint
      await contract.mint('xPNzTSthMggerKQB').should.be.rejected;
    })
  })
})