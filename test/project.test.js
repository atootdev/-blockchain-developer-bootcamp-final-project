const SneakerDrop = artifacts.require('./SneakerDrop.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SneakerDrop', (accounts) => {
  let contract, sneaker

  before(async () => {
    contract = await SneakerDrop.deployed()
  })

  describe('SneakerDrop Deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('New Sneaker Contract', async () => {
    it('has a name', async () => {
      sneaker = await contract.newSneaker('mod_Yeezy','MDYZ')
      const name = await sneaker.name()
      assert.equal(name, 'mod_Yeezy')
    })

  })

})