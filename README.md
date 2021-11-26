# Final project – Sneaker Drop

## Project description

An app that allows sneaker brands like Nike, adidas, etc to create NFT tokens of their limited release drops. Customers who purchase the sneaker online or instore will be sent a confirmation code either by email or printed receipt. Customers will then login to the App via Metamask and use their code to mint their sneaker NFT. 

The NFT will provide customers with certified ownership and authenticity of their physical sneaker.

## Directory structure

- "client": Project's React frontend.
- "contracts": Smart contracts that are deployed on the Rinkeby testnet.
- "migrations": Migration files for deploying contracts in "contracts" directory.
- "test": Tests for smart contracts.
- “scripts”: JS scripts to upload confirmations codes and images to contracts.
## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache >= 5.4.19
- "git clone REPOSITORY_URL"

### Backend - Blockchain/Smart Contracts

- Run "npm install" in project root to install smart contract dependencies
- Run local testnet in either port “7545” with Ganache GUI or port “8545” with ganache client
- "truffle migrate --network development/ganache (for GUI)"
- "truffle console --network development/ganache"
- Run tests in Truffle console: "test"

### Populate locally deployed contracts with token images and confimation codes

- "truffle console --network development/ganache"
- “exec scripts/add-codes.js”
- “exec scripts/add-images.js”
### Frontend - React

- Copy the "contracts" folder in "./build/contracts" and paste into "client/src"
- Run "cd client"
- Run "npm install" to install front end dependencies
- Run "npm start"
- Open "http://localhost:3000"
- Copy the "seed phrase" from ganache and import into Metamask
- Make sure your Metamask localhost network is in the correct port "7545/8545" and chain id is "1337"
- If you get "TXRejectedError" when sending a transaction, reset your Metamask account from Advanced settings.

### App Functions

- The first account is the "seller" account with access to the "Launch" and "End" buttons.
- Any other account is the "buyer" account with access to the "Mint" function.
- Confirmation codes can be found in the "add-codes.js" file in the "/scripts" directory
## Workflow

Buyer:
1. Enter web site
2. Login with Metamask
3. Browse uploaded sneakers
4. Select sneaker
5. Input the confirmation code and click “Mint” to mint the sneaker NFT (smart contract call)

Seller:
1. Enter web site
2. Login with Metamask
3. Select sneaker
4. Click the “Launch” or “End” button to allow or block minting (smart contract call)

## Deployed version url:
Deployed on Rinkeby testnet

https://sneaker-drop.netlify.app/

## Screencast link


## Public Ethereum wallet for certification:

"0xb7F0E927Db0d1e8D596b983a3F187d8636f95300"

## Environment variables (not needed for running project locally)

"""
MNEMONIC=
INFURA_KEY=
"""

## TODO features

- Factory contract to create and access Sneaker NFT contracts
- User contract to store Factory contracts
- Factory contract to create and store User contracts
- Single function in Sneaker NFT contract to get all relevant data and change variable sneakerList to private
