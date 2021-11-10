import React, { Component } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';
import Navbar from '../components/Navbar';
import Tokenlist from './Tokenlist';
import { contract_jsons, contract_names } from '../utils/Web3Wrapper.config'

class AppOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contracts: [],
      data: [],
      loading: true,
      connected: false,
    };
  }

  // componentDidMount() {
  //   this.loadBlockchainData()
  // }

  async connectWeb3() {
    console.log(this.state.data);
    this.setState({ loading: true });
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await this.loadBlockchainData();
      this.setState({ connected: true });
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    this.setState({ loading: false });
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    for (var i = 0; i < contract_jsons.length; i++) {
      var contract, json;
      json = contract_jsons[i];
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = json.networks[networkId];
      if (deployedNetwork) {
        contract = await new web3.eth.Contract(json.abi, deployedNetwork.address);
        this.setState({
          contracts: [...this.state.contracts, contract]
        })
      }
    }
    await this.loadContracts();
  }

  async loadContracts() {
    const contracts = this.state.contracts;
    for (var i = 0; i < contracts.length; i++) {
      var contract, data;
      contract = contracts[i];
      const id = i;
      const name = await contract.methods.name().call();
      const owner = await contract.methods.owner().call();
      const image = await contract.methods.tokenURI(0).call();
      const isActive = await contract.methods.isActive().call();
      const seller = this.state.account === owner ? true : false;
      data = {
        id: id,
        name: name,
        owner: owner,
        image: image,
        isActive: isActive,
        seller: seller
      };
      this.setState({
        data: [...this.state.data, data]
      })
    }
  }

  async loadContractData(i, contract) {
    const data = this.state.data.slice(0, i + 1);
    console.log(data)
    const current = data[i];
    current.id = i;
    current.name = await contract.methods.name().call();
    current.owner = await contract.methods.owner().call();
    current.image = await contract.methods.tokenURI(0).call();
    current.isActive = await contract.methods.isActive().call();
    current.seller = this.state.account === current.owner ? true : false;
    this.setState({
      data: data.concat([{
        id: current.id,
        name: current.name,
        owner: current.owner,
        image: current.image,
        isActive: current.isActive,
        seller: current.seller
      }])
    })
    console.log(this.state.data)
  }

  async loadContract(_owner) {
    let data = this.state.data;
    for (var i = 0; i < data.length; i++) {
      let count = 0;
      let owner = data[i].owner;
      if (_owner === owner) {
        let contract = this.state.contracts[i];
        await this.loadContractData(count, contract);
        count = count + 1;
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
          <button className="btn btn-primary mt-3" onClick={() => this.connectWeb3()}>
            Connect MetaMask
          </button>
        );
      }
    } else {
      content = (
        <Tokenlist
          sneakers={this.state.data}
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
            <main>
              {content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default AppOne;