import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ad extends Component {
  render() {
    const adImg = "https://github.com/edufectcode/react/blob/main/data/MyStore-sale.jpg?raw=true";
    return (
      <>
        <div className='text-center my-3'>
          <Link to="/products">
            <img src={adImg} alt="ad" className='ad-image object-fit-contain' />
          </Link>
        </div>
      </>
    )
  }
}
