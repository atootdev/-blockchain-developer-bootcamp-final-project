import React, { Component } from 'react'
import styled from 'styled-components';

import LaunchButton from './Buttons/LaunchButton';
import EndButton from './Buttons/EndButton';
import MintForm from './Forms/MintForm';

const Card = styled.div.attrs({ className: "card shadow p-3 mb-5 bg-body rounded" })`
  min-width: 200px;
  max-width: 500px;
  img {
    height: 350px;
    max-width: 100%;
  }
  img.small {
    max-width: 50%;
    height: 60px;
  }
`

export default class TokenList extends Component {

  render() {
    const { id, name, owner, image, active, account } = this.props;
    const seller = account === owner ? true : false;
    let content;
    if (active) {
      console.log(active, seller);
      if (seller) {
        content = <EndButton
          id={id}
          setIsActive={this.props.setIsActive}
        />
      } else {
        content = <MintForm
          id={id}
          mint={this.props.mint}
        />
      }
    } else {
      if (seller) {
        content = <LaunchButton
          id={id}
          setIsActive={this.props.setIsActive}
        />
      }
      else {
        content = <h4 className="mt-3">Launches Nov 30th</h4>
      }
    }
    return (
      <div className="col">
        <Card key={id}>
          <div className="card-header">
            <h5 className="card-title">{name}</h5>
          </div>
          <div className="card-body text-center">
            <img
              src={image}
              className="card-img"
              alt=""
            />
            {content}
          </div>
        </Card>
      </div>
    )
  }
}