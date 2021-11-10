import React, { Component } from 'react'

class ActiveToken extends Component {
    render(){
    let status;
    if(this.props.seller){
        status = <button type="button" class="btn btn-danger" onClick={() => {
            this.props.setIsActive(false)
        }}>
            End
        </button>
    } else {
        status = <form className="input-group mb-3" onSubmit={(event) => {
            event.preventDefault()
            const code = this.input.value.toString()
            this.props.mint(code)
        }}>
            <input 
                type="text"
                ref={(input) => { this.input = input }}
                className="form-control"
                id="inputConfirmationCode"
                placeholder="Enter Your Confirmation Code"
                required 
            />
            <button className="btn btn-success btn-lg" type="submit" id="button-mint">Mint</button>
            {/* <input
                type="submit"
                className="btn btn-block btn-success btn-lg mt-2"
                value="Mint"
            /> */}
        </form>
    }
    return (
        <article className="sneaker">
            <img
                src={this.props.image}
                className="token-image"
                alt=""
            />
            <h1 className="token-name">{this.props.name}</h1>
            <h4 className="active-status">Active</h4>
            {status}
        </article>
    )
    }
}

export default ActiveToken
