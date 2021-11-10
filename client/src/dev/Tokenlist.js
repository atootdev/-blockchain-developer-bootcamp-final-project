import React from 'react'
import ActiveToken from '../components/ActiveToken';
import InActiveToken from '../components/InActiveToken';

const Tokenlist = ({ sneakers, setIsActive, mint }) => {
  // attribute, eventHandler
  // onClick, onMouseOver
  // If status is Not Live, button is active. When clicked, turn to End Launch.

//   const clickHandler = (e) => {
//     console.log(e);
//     console.log(e.target);
//   }

  // const statusHandler = (status) => {
  //   if(status.on) {
  //     status.message = "Live";
  //   };
  //   return status.message;
  // }
  
  return (
    <div id="content" className="sneakerlist">
      {sneakers.map((sneaker) => {
        const {id, name, owner, image, isActive, seller} = sneaker;
        if(isActive){
          return (
            <ActiveToken 
                  name={name}
                  seller={seller}
                  image={image}
                  setIsActive={setIsActive}
                  mint={mint}
                />
          )
        } else {
          return (
            <InActiveToken 
                  name={name}
                  seller={seller}
                  image={image}
                  setIsActive={setIsActive}
                />
          )
        }
        {/* return (
          <article key={id} className="sneaker">
          <img
            src={image}
            className="token-image"
            alt=""
          />
          <h1 className="token-title">{name}</h1>
          <h4 className="active-status">{isActive ? "active" : "inactive"}</h4>
          </article>
        ) */}
      })}
    </div>
  );
};

export default Tokenlist
