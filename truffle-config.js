require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "byzantium"
    }
  }
};
