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
      "account": 0,
      "image": "ipfs://bafybeibm2xpc3kg2uzdzswpmzfurvvkxihumugstatihur4keemouldg2i",
      "tokenURI": 'ipfs://bafybeibjsmnwszcvfebzcsm7skpy3yzp5cec7ejus4tlv6j54syxdy4jx4',
    },
    {
      "instance": Blue,
      "name": "Air Jordan 1 Off-White Retro High OG UNC",
      "symbol": "OWAJB",
      "account": 0,
      "image": "ipfs://bafybeifc2dmezpgxferwxthkyurzfrtbkkqj6o2wzsaoh53wnxxmmv3dwm",
      "tokenURI": 'ipfs://bafybeibjb3wl6ks6y4av3egshezycgk5jmrdgovamvzyrzzwhmgyn4jlty',
    },
    {
      "instance": White,
      "name": "Air Jordan 1 Off-White Retro High OG White",
      "symbol": "OWAJW",
      "account": 0,
      "image": "ipfs://bafybeiftrnk5owcorwmam5jeguu3ybnmte3ppquxlide5y5easifh5qsma",
      "tokenURI": 'ipfs://bafybeiedcw3nhbxuthx7rlpgadhxzc7fthb5r3wqw7eystam4qlwp4xdfa',
    },
    {
      "instance": Zebra,
      "name": "adidas Yeezy Boost 350 V2 Zebra",
      "symbol": "YZBA",
      "account": 1,
    }
    ];

  let sneakerNike, sneakerAd, sneakers, sneaker

  before(async () => {
    sneakerNike = await Red.new(sneakerProps[0]['name'], sneakerProps[0]['symbol']);
    sneakerAd = await Zebra.new(sneakerProps[3]['name'], sneakerProps[3]['symbol']);
  });

  describe('Sneaker deployment', async () => {
    it('nike: should have an address', async () => {
      sneaker = sneakerNike
      let address = sneaker.address
      assert.notEqual(address, emptyAddress)
    })
    it('nike: should have a name', async () => {
      let sneakerName = await sneaker.name()
      assert.equal(sneakerName, sneakerProps[0]['name'])
    })
    it('adidas: should have an address', async () => {
      sneaker = sneakerAd
      let address = sneaker.address
      assert.notEqual(address, emptyAddress)
    })
    it('adidas: should have a name', async () => {
      let sneakerName = await sneaker.name()
      assert.equal(sneakerName, sneakerProps[3]['name'])
    })
  })

  describe('Transfer ownershiper', async () => {
    it('nike: should transfer ownership to nike', async () => {
      sneaker = sneakerNike
      await sneaker.transferOwnership(nike)
      let owner = await sneaker.owner()
      assert.equal(owner, nike)

      await sneaker.transferOwnership({ from: adidas }).should.be.rejected;
    })
    it('adidas: should transfer ownership to adidas', async () => {
      sneaker = sneakerAd
      await sneaker.transferOwnership(adidas)
      let owner = await sneaker.owner()
      assert.equal(owner, adidas)

      await sneaker.transferOwnership({ from: nike }).should.be.rejected;
    })
  })
})