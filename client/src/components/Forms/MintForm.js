import React, { Component } from 'react'

export default class MintForm extends Component {
  render() {
    return (
      <form className="input-group mt-3" onSubmit={(event) => {
        event.preventDefault()
        const code = this.input.value.toString()
        this.props.mint(this.props.id, code)
      }}>
        <input
            type="text"
            ref={(input) => { this.input = input }}
            className="form-control"
            placeholder="Enter Your Confirmation Code"
            required
        />
        <button className="btn btn-success btn-lg" type="submit">Mint</button>
      </form>
    )
  }
}
