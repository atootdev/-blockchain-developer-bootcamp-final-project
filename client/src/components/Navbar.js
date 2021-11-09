import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    //   let content
    //   if(this.props.connected){
    //     content = <span id='account'>{this.props.account}</span>
    //   } else {
    //     content = <button className="btn btn-primary" onClick={() => this.props.connectWeb3()}>
    //                 Connect MetaMask
    //                 </button>
    //   }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div className="container">
        <a 
          className="navbar-brand"
          href="https://github.com/atootdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sneaker Drop
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=" navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <a className="nav-link active" href=" ">Home</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href=" " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Browse
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href=" ">Sneakers</a></li>
                        <li><a className="dropdown-item" href=" ">Streetwear</a></li>
                        <li><a className="dropdown-item" href=" ">Collectibles</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href=" ">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href=" ">Help</a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link" href=" ">Contact Us</a>
                </li>
            </ul>
            <div className="d-flex">
                <span id='account'>{this.props.account}</span>
            </div>
        </div>
    </div>
</nav>
    )
  }
}