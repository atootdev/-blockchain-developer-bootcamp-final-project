import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import TokenList from './components/TokenList';
import { contract_jsons, CONTRACTS } from './config';
class App extends Component {
  constructor(props) {
    super(props);
    this.connectWallet = this.connectWallet.bind(this);
    this.state = {
      account: undefined,
      contracts: [],
      tokens: [],
      loading: true,
      connectedweb3: false,
      connectedWallet: false
    };
  }

  async componentDidMount() {
    await this.loadBlockchainData()
    await this.loadContracts()
  }

  async loadBlockchainData() {
    let web3;
    if(window.ethereum){
      web3 = new Web3(window.ethereum);
      this.setState({ connectedweb3: true });
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    if(this.state.account !== undefined) {
      this.setState({ connectedWallet: true })
    }
    const networkId = await web3.eth.net.getId()
    let contracts;
    if(networkId !== 4){
      contracts = contract_jsons;
    } else {
      contracts = CONTRACTS;
    }
    for(var i = 0; i < contracts.length; i++){
      let abi = contracts[i].abi;
      let address = contracts[i].networks[networkId].address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({
        contracts: [...this.state.contracts, contract]
      })
    }
  }

  async loadContracts() {
    const contracts = this.state.contracts;
    let tokens = [];
    for(var i = 0; i < contracts.length; i++) {
      const contract = contracts[i];
      const name = await contract.methods.name().call();
      const owner = await contract.methods.owner().call();
      const image = await contract.methods.tokenURI(0).call();
      const active = await contract.methods.isActive().call();
      tokens[i] = { 
        id: i,
        name: name, 
        owner: owner,
        image: image, 
        active: active 
      };
    };
    this.setState({ tokens: tokens });
    this.setState({ loading: false })
  }

  async connectWallet() {
    this.setState({ loading: true });
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({ account: accounts[0] });
      this.setState({ connectedWallet: true });
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    await this.loadContracts();
    this.setState({ loading: false });
  }

  setIsActive = (i, active) => {
    this.setState({ loading: true });
    const contract = this.state.contracts[i];
    contract.methods.setIsActive(active)
    .send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.loadContracts();
    });
  };
  

  mint = (i, code) => {
    this.setState({ loading: true });
    const contract = this.state.contracts[i];
    contract.methods.mint(code).send({ from: this.state.account })
    .on('transactionHash', (hash) => {
      this.setState({ loading: false })
    });
  };
  // fix when setState is performed. Show error if failed.

  render() {
    const { tokens, loading } = this.state;
    
    return (
      <div>
        <Navbar
          account={this.state.account}
          connectedWallet={this.state.connectedWallet}
          connectWallet={this.connectWallet}
        />


        <main>
          <div className='container-fluid '>

            {loading

              ? <div className='spinner-border' role='status'></div>

              : <>
              <div className="row row-cols-2 row-cols-md-3 g-4">
                {tokens.map((data) => {
                  return (
                    <TokenList
                      {...data}
                      key={data.id}
                      account={this.state.account}
                      setIsActive={this.setIsActive}
                      mint={this.mint}
                    />
                  )
                })}
              </div>
              </>
            }
          </div>
        </main>

      </div>
    );
  }
}

export default App;
