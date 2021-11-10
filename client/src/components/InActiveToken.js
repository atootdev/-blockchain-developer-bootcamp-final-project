import React, { Component } from 'react'

class InActiveToken extends Component {
    render(){
    let status;
    if(this.props.seller){
        status = <button type="button" class="btn btn-primary" onClick={() => {
            this.props.setIsActive(true)
          }}>
            Launch
          </button>
    } else {
        status = <h3>Launches on date</h3>
    }
    return (
        <article className="sneaker">
            <img
                src={this.props.image}
                className="token-image"
                alt=""
            />
            <h1 className="token-name">{this.props.name}</h1>
            <h4 className="active-status">InActive</h4>
            {status}
        </article>
    )
    }
}

export default InActiveToken
