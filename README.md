# Final project – Sneaker Drop

## Intro

The sneaker market has blown up the past decade with shoe brand titans like Nike and adidas reaping in billions. Each year customers go to great lengths to secure themselves a newly released sneaker, though few will actually ever wear them. For many sneakers are an investment. Bought anywhere between $160-$300, highly coveted or popular sneakers will resell for $2000 to $30000 and less popular sneakers going for retail to $600. However these high resell prices have made themselves a target for fraud. With every new release, thousands of counterfeit copies are made, with some looking nearly indistinguishable from the original. Many will fall victim to buying counterfeit sneakers, sometimes paying thousands of dollars for them, only to later realize they were duped. Today there is still no garunteed method to seperate the fake from the real, but hopefully NFTs can solve this problem...

## Project description

This project aims to create an app that allows sneaker brands like Nike and adidas to create NFT tokens of their sneakers. Customers who purchase the sneaker online or instore will be sent a confirmation code either by email or printed receipt. Customers will then login to the App via Metamask and use their code to mint their sneaker NFT. 

The NFT will serve as a proof of ownership and certification of authenticity of the physical sneaker.
NFTs will be linked to the sneaker by serial code, confirmation code, and a QR code.
When customers want to resell their shoes online or in person, all they need to do is scan the QR code on their shoe which will display the NFT contract and the current owner.

## Directory structure

- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed on the Rinkeby testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.
- `scripts`: JS scripts to upload confirmations codes and images to contracts.
## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache >= 5.4.19
- `git checkout master`

### Backend - Blockchain/Smart Contracts

- Run `npm install` in project root to install smart contract dependencies
- Run local testnet in port `8545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`

### Populate locally deployed contracts with token images and confimation codes

- `truffle console --network development`
- `exec scripts/add-codes.js`
- `exec scripts/add-images.js`
### Frontend - React

- Copy the `contracts` folder in `./build/contracts` and paste into `client/src`
- Run `cd client`
- Run `npm install` to install front end dependencies
- Copy the `mnemonic` from the Ethereum client and import into Metamask
- Make sure your Metamask network is set to `Localhost 8545` in the correct port `8545` and chain id is `1337`
- If you get `TXRejectedError` when sending a transaction, reset your Metamask account from Advanced settings.
- Run `npm start`
- Open `http://localhost:3000`

### App Functions

- The first `account` is the `seller` account with access to the `Launch` and `End` buttons.
- Any other `account` is the "buyer" account with access to the `Mint` function.
- `Confirmation codes` can be found in the `add-codes.js` file in the `/scripts` directory
## Workflow

Buyer:
1. Enter web site
2. Login with Metamask
3. Browse uploaded sneakers
4. Select sneaker
5. Input the confirmation code and click `Mint` to mint the sneaker NFT (smart contract call)

Seller:
1. Enter web site
2. Login with Metamask
3. Select sneaker
4. Click the `Launch` or `End` button to allow or block minting (smart contract call)

## Deployed version url:
Deployed on Rinkeby testnet

https://blockchain-developer-bootcamp-final-project-atootdev.netlify.app/

## Screencast link

https://youtu.be/RiLm9KR6Jpc

## Public Ethereum wallet for certification:

`0xb7F0E927Db0d1e8D596b983a3F187d8636f95300`

## Environment variables (not needed for running project locally)

```
MNEMONIC=
INFURA_KEY=
```

## Future Work
### Short Term
- Remove tokenId variable from Sneaker struct
- Single function in Sneaker NFT contract to get all relevant data
- Other contract improvements (from reviews, comments, etc)
### Medium Term
- Create ERC721 Factory contract
- Create ERC721 contracts for streetwear and collectibles
- Utilize IPFS for file storage of token meta data
- Research solution for generating user profiles and data storage (blockchain, off/side chain?)
### Long Term
- Perform live test with small business
- Research alternative blockchains for cheaper fees and faster rates
- Improve UI/UX (state management, styling, etc)
