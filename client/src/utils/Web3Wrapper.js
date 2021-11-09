class Web3Wrapper {

  constructor(web3, contracts_json) {

    this.contractsJSON = [];

    for (var i = 0; i < contracts_json.length; i++) {
      this.contractsJSON[contracts_json[i].contractName] = contracts_json[i];
    }
    
    this.web3 = web3;
    this.contracts = [];
  }

  async initializeContracts(contracts_names) {

    this.accounts = await this.web3.eth.getAccounts();

    for (var i = 0; i < contracts_names.length; i++) {
      var contract, json;
      json = this.contractsJSON[contracts_names[i]]
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = json.networks[networkId];
      if(deployedNetwork) {
        contract = await new this.web3.eth.Contract(json.abi, deployedNetwork.address);
        this.contracts[contracts_names[i]] = contract;
      }
    }
  }


  async loadContract(contract_name) {
    return this.contracts[contract_name];
  };

}


export default Web3Wrapper;