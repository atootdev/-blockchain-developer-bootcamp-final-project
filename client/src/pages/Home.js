import React from 'react'

import { sneakers } from '../components/sneakers'
import TokenList from '../components/TokenList'

const Home = () => {

  return (
    <section className='sneakerlist'>
      <TokenList sneakers={sneakers} />
    </section>
  );
}

export default Home
