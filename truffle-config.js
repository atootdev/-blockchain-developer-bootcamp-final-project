require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();
const mnemonicPhrase = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    ganache: {
      host: "127.0.0.1",    
      port: 7545,            // Ganache gui client
      network_id: "*",       
    },
    ropsten: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicPhrase
        },
        providerOrUrl: 'https://ropsten.infura.io/v3/' + infuraKey
      }),
      network_id: '3',
      gas: 5500000,
      confirmations: 2,
      timeoutBlock: 500,
      skyDryRun: true,
      from: "0xb7F0E927Db0d1e8D596b983a3F187d8636f95300"
    },
    rinkeby: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicPhrase
        },
        providerOrUrl: 'https://rinkeby.infura.io/v3/' + infuraKey
      }),
      network_id: '4',
      gas: 5500000,
      confirmations: 2,
      timeoutBlock: 200,
      skyDryRun: true,
      from: "0x5a16589586cBb3B5f5fCf230BAe6a0B20DBe2ee7"
    }
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './build/contracts/',
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "byzantium"
    }
  }
};
