import React, { Component } from 'react'

export default class TokenList extends Component {

  render() {
    let active, button
    if(this.props.isActive){
      active = <h4 className="active-status">Active</h4>
      button = <button type="button" class="btn btn-danger" onClick={() => {
        this.props.setIsActive(false)
        }}>
          End
      </button>
    } else {
      active = <h4 className="active-status">Not Active</h4>
      button = <button type="button" class="btn btn-primary" onClick={() => {
        this.props.setIsActive(true)
        }}>
          Launch
      </button>
    }
    return (
      <div id="sneakerList">
      <article className="sneaker" onMouseOver={() => {
        console.log(this.props.name);
      }}>
      <img
        src={this.props.image}
        className="token-image"
        alt=""
      />
      <h1 className="token-name">{this.props.name}</h1>
      {active}
      {button}
      </article>
      </div>
    )
  }
}