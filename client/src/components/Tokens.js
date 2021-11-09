import React from 'react'

const TokenList = (sneakers) => {
  // attribute, eventHandler
  // onClick, onMouseOver
  // If status is Not Live, button is active. When clicked, turn to End Launch.
  const clickHandler = (status) => {
    console.log(status);
  }

  const clickHandlers = (e) => {
    console.log(e);
    console.log(e.target);
  }

  // const statusHandler = (status) => {
  //   if(status.on) {
  //     status.message = "Live";
  //   };
  //   return status.message;
  // }
  
  return (
    <div id="content">
      {sneakers.map((sneaker) => {
        const {img, title, status} = sneaker;
        return (
          <article className="sneaker" onMouseOver={() => {
            console.log(title);
          }}>
          <img
            src={img}
            className="token-image"
            alt=""
          />
          <h1 className="token-title">{title}</h1>
          <h4 className="active-status">{status.message}</h4>
          <button type="button" onClick={clickHandlers}>example</button>
          <button type="button" onClick={() => {
            clickHandler(status)}}>
              Launch Sneaker
          </button>
          </article>
        )
      })}
    </div>
  );
};

export default TokenList
