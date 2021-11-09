import React, { Component } from 'react'

export default class Register extends Component {
  render() {
    return (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.createUser(this.user.address, this.user.name)
        }}>
          <input id="newUser" ref={(input) => this.user = input} type="text" className="form-control" placeholder="Add user address..." required />
          <input type="submit" hidden={true} />
        </form>
      </div>
    )
  }
}
