const { assert } = require('chai')

const SneakerDrop = artifacts.require('./SneakerDrop.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SneakerDrop', (accounts) => {
  let contract
  let sneaker

  before(async () => {
    contract = await SneakerDrop.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('create new sneaker contract', async () => {
    it('created new sneaker contract', async () => {
      sneaker = await contract.newSneaker('mod_Yeezy','MDYZ')
      const sneaker_address = sneaker.address
      assert.notEqual(sneaker_address, 0x0)
      assert.notEqual(sneaker_address, '')
      assert.notEqual(sneaker_address, null)
      assert.notEqual(sneaker_address, undefined)
    })
    it('has a name', async () => {
      const name = await sneaker.name()
      assert.equal(name, 'mod_Yeezy')
    })

  })

})