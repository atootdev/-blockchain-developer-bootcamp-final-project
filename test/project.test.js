const Red = artifacts.require("SneakerTokenOne");
const Blue = artifacts.require("SneakerTokenTwo");
const White = artifacts.require("SneakerTokenThree");
const Zebra = artifacts.require("SneakerTokenFour");
const { assert } = require("chai");

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('SneakerTest', async (accounts) => {
  const [main, nike, adidas, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  const confirmationCodes = ["VgvVyFh0KFDuX8bX", "pTa9w2b61Ec2ocYJ", "DFUVYzqJtPExbES5", "CJHol0Ff3HlO3GMx"];
  const invalidCodes = ["a", 123, "h9eLSh1Kfy34mOkz"];
  const sneakerProps = [
    {
      "instance": Red,
      "name": "Air Jordan 1 Off-White Retro High OG Chicago",
      "symbol": "OWAJR",
      "owner": nike,
      "image": "https://i.imgur.com/pcKn2GQ.png",
    },
    {
      "instance": Blue,
      "name": "Air Jordan 1 Off-White Retro High OG UNC",
      "symbol": "OWAJB",
      "owner": nike,
      "image": "https://i.imgur.com/OtC9rVb.jpg",
    },
    {
      "instance": White,
      "name": "Air Jordan 1 Off-White Retro High OG White",
      "symbol": "OWAJW",
      "owner": nike,
      "image": "https://i.imgur.com/frqeCIi.jpg",
    },
    {
      "instance": Zebra,
      "name": "adidas Yeezy Boost 350 V2 Zebra",
      "symbol": "YZBA",
      "owner": adidas,
      "image": "https://i.imgur.com/xYkBVKr.jpg"
    }
    ];

  let sneakerRed, sneakerBlue, sneakerWhite, sneakerZebra, sneaker

  before(async () => {
    sneakerRed = await Red.new(sneakerProps[0]['name'], sneakerProps[0]['symbol']);
    sneakerBlue = await Blue.new(sneakerProps[1]['name'], sneakerProps[1]['symbol']);
    sneakerWhite = await White.new(sneakerProps[2]['name'], sneakerProps[2]['symbol']);
    sneakerZebra = await Zebra.new(sneakerProps[3]['name'], sneakerProps[3]['symbol']);
  });

  describe('Deploy Sneaker', async () => {
    it('Red: should have an address', async () => {
      const redAddress = sneakerRed.address
      assert.notEqual(redAddress, emptyAddress)
    })
    it('Red: should have a name', async () => {
      const redName = await sneakerRed.name()
      assert.equal(redName, sneakerProps[0]['name'])
    })
    it('Red: should have an owner', async () => {
      let redOwner = await sneakerRed.owner()
      assert.equal(main, redOwner)
    })
  })

  describe('Transfer Ownershiper', async () => {
    it('Red: should transfer ownership to account nike', async () => {
      await sneakerRed.transferOwnership(nike, ({ from: main }))
      const redOwner = await sneakerRed.owner()
      assert.equal(redOwner, nike)

      await sneakerRed.transferOwnership({ from: adidas }).should.be.rejected;
    })
  })

  describe('Upload Confirmation Codes', async () => {
    it('Red: should upload confirmation codes', async () => {
      await sneakerRed.addToConfList(confirmationCodes, { from: nike })
      const code = confirmationCodes[0];
      const redStruct = await sneakerRed.sneakerList(code)
      assert.equal(code, redStruct.code)

      await sneakerRed.addToConfList(confirmationCodes, { from: adidas }).should.be.rejected
    })
  })

  describe('Activate Sneaker', async () => {
    it('Red: should set isActive to true', async () => {
      await sneakerRed.setIsActive(true, { from: nike })
      const redResult = await sneakerRed.isActive()
      assert.equal(true, redResult)
    })
  })

  describe('Mint Sneaker', async () => {
    it('Red: should allow customer to mint NFT with confirmation code', async () => {
      const code = confirmationCodes[0];
      await sneakerRed.mint(code, { from: alice })
      const redStruct = await sneakerRed.sneakerList(code)
      assert.equal(false, redStruct.active)

      await sneakerRed.mint(code, { from: bob }).should.be.rejected;
    })
  })
})