const Red = artifacts.require("SneakerTokenOne");
const { assert } = require("chai");

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('SneakerTest', async (accounts) => {
  const [main, nike, adidas, alice] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  const confirmationCodes = ["VgvVyFh0KFDuX8bX", "pTa9w2b61Ec2ocYJ", "DFUVYzqJtPExbES5", "CJHol0Ff3HlO3GMx"];
  const invalidCodes = ["a", 123, "h9eLSh1Kfy34mOkz"];
  const sneakerProps = {
    "instance": Red,
    "name": "Air Jordan 1 Off-White Retro High OG Chicago",
    "symbol": "OWAJR",
    "owner": nike,
    "image": "https://i.imgur.com/pcKn2GQ.png",
  };

  let sneaker

  before(async () => {
    sneaker = await Red.new(sneakerProps['name'], sneakerProps['symbol']);
  });

  describe('Initial deployment', async () => {
    it('should have an address', async () => {
      // get address
      const address = sneaker.address
      // verify its not empty
      assert.notEqual(address, emptyAddress, "Address should not be empty")
    })
    it('should have a name', async () => {
      // get name
      const name = await sneaker.name()
      // verify the name is correct
      assert.equal(name, sneakerProps['name'], `Name should be ${sneakerProps['name']}`)
    })
    it('should have an owner', async () => {
      // get owner address
      const owner = await sneaker.owner()
      // verify the owner is correct
      assert.equal(main, owner, `Initial owner should be ${main}`)
    })
  })

  describe('Transfer ownershiper', async () => {
    it('should restrict access to owner', async () => {
      // verify only current owner has access
      await sneaker.transferOwnership(nike, ({ from: nike })).should.be.rejected
    })
    it('should transfer ownership to new owner', async () => {
      // transfer ownership to new address
      await sneaker.transferOwnership(nike, ({ from: main }))
      // get the new owner address
      const owner = await sneaker.owner()
      // verify the new owner is correct
      assert.equal(owner, nike, `New owner should be ${nike}`)
    })
  })

  describe('Upload confirmation codes', async () => {
    it('should restrict access to owner', async () => {
      // verify only current owner has access
      await sneaker.addToConfList(confirmationCodes, { from: adidas }).should.be.rejected
    })
    it('should upload confirmation codes', async () => {
      // upload confirmation code list
      await sneaker.addToConfList(confirmationCodes, { from: nike })
      // get confirmation code for testing
      const code = confirmationCodes[0];
      // get Sneaker struct from the testing code
      const result = await sneaker.sneakerList(code)
      // verify the code was uploaded correctly
      assert.equal(code, result.code, "Confirmation codes should match")
    })
    it('should prevent invalid codes from working', async () => {
      // get invalid code
      const code = invalidCodes[0];
      // get Sneaker struct with invalid code
      const result = await sneaker.sneakerList(code)
      // verify that the code is not active (a modifier prevents inactive codes from minting)
      assert.notEqual(true, result.active)
    })
  })

  describe('Activate sneaker for minting', async () => {
    it('should restrict access to owner', async () => {
      // verify that only the current owner has access
      await sneaker.setIsActive(true, { from: adidas }).should.be.rejected
    })
    it('should set isActive to true', async () => {
      // set the active state to true
      await sneaker.setIsActive(true, { from: nike })
      // get the active status
      const result = await sneaker.isActive()
      // verify the status is true
      assert.equal(true, result, 'Active status should be true')
    })
  })

  describe('Mint sneaker', async () => {
    it('should allow anyone to mint NFT with confirmation code', async () => {
      // get the confirmation code
      const code = confirmationCodes[0]
      // mint the NFT with the code
      await sneaker.mint(code, { from: alice })
      // get the Sneaker struct mapped to the code
      const result = await sneaker.sneakerList(code)
      // verify the code is inactive
      assert.equal(false, result.active, 'Code status should be false')
      // Need to add verification of event
    })
    it('should reject invalid codes from minting', async () => {
      // verify inactive code will be rejected
      await sneaker.mint(invalidCodes[0], { from: alice }).should.be.rejected
    })
    it('should reject used codes from minting', async () => {
      // get the confirmation code
      const code = confirmationCodes[0]
      // verify that used code is rejected
      await sneaker.mint(code, { from: alice }).should.be.rejected
    })
  })
})