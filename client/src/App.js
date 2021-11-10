import React, { Component } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Navbar from './components/Navbar';
import TokenList from './components/TokenList';
import { contract_jsons, contract_names } from './utils/Web3Wrapper.config'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      seller: false,
      contract: {},
      contracts: [],
      owner: '',
      tokenName: '',
      isActive: false,
      tokenImage: '',
      loading: true,
      connected: false,
    };
  }

  // componentDidMount() {
  //   this.loadBlockchainData()
  // }

  async connectWeb3() {
    this.setState({ loading: true });
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await this.loadBlockchainData();
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    this.setState({ connected: true });
    this.setState({ loading: false });
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    for(var i = 0; i < contract_jsons.length; i++){
      var contract, json;
      json = contract_jsons[i];
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = json.networks[networkId];
      if(deployedNetwork) {
        contract = await new web3.eth.Contract(json.abi, deployedNetwork.address);
        this.setState({
          contracts: [...this.state.contracts, contract]
        })
      }
    }
    await this.loadContractData(this.state.contracts[0])
  }

  async loadContractData(contract) {
    this.setState({ contract });
    const owner = await contract.methods.owner().call();
    this.setState({ owner });
    const tokenName = await contract.methods.name().call();
    this.setState({ tokenName });
    const isActive = await contract.methods.isActive().call();
    this.setState({ isActive });
    const tokenImage = await contract.methods.tokenURI(0).call();
    this.setState({ tokenImage });
    let seller;
    if (this.state.account === this.state.owner) {
      seller = true
    } else {
      seller = false
    }
    this.setState({ seller });
  }

  async loadContract(sneaker) {
    const contracts = this.state.contracts;
    for(var i = 0; i < contracts.length; i++) {
      let contract = contracts[i];
      let name = await contract.methods.name().call();
      if(name === sneaker){
        this.loadContractData(contract);
        break;
      }
    }
  }

  setIsActive = (active) => {
    this.state.contract.methods
      .setIsActive(active)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ isActive: active });
      });
  };

  mint = (code) => {
    this.state.contract.methods.mint(code).send({ from: this.state.account })
  }

  render() {
    let content
    if (this.state.loading) {
      if (this.state.connected) {
        content = (
          <div id='loader' className='text-center'>
            <p className='text-center'>Loading...</p>
          </div>
        );
      } else {
        content = (
          // <div id='login' className='text-center'>
          //   <p className='text-center'>Login In</p>
          // </div>
          <button className="btn btn-primary" onClick={() => this.connectWeb3()}>
                    Connect MetaMask
                    </button>
        );
      }
    } else {
      content = (
        <TokenList
          name={this.state.tokenName}
          seller={this.state.seller}
          isActive={this.state.isActive}
          image={this.state.tokenImage}
          setIsActive={this.setIsActive}
          mint={this.mint}
        />
      );
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className='container-fluid'>
          <div className='row'>
            <main
              role='main'
              className='col-lg-12 d-flex justify-content-center'>
              {content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;