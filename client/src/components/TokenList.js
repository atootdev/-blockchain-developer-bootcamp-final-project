import React, { Component } from 'react'
import ActiveToken from './ActiveToken'
import InActiveToken from './InActiveToken'

export default class TokenList extends Component {

  render() {
    let content
    if (this.props.isActive) {
      content = <ActiveToken 
                  name={this.props.name}
                  seller={this.props.seller}
                  image={this.props.image}
                  setIsActive={this.props.setIsActive}
                  mint={this.props.mint}
                />
    } else {
      content = <InActiveToken 
                  name={this.props.name}
                  seller={this.props.seller}
                  image={this.props.image}
                  setIsActive={this.props.setIsActive}
                />
    }
    return (
      <div id="sneakerList" className="content mr-auto ml-auto">
        {content}
      </div>
    )
  }
}