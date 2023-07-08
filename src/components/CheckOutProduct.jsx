import React, { Component } from 'react'
import Ad from './Ad';
import DeliveryDetails from './DeliveryDetails';

export default class CheckOutProduct extends Component {


  redirectToLogin = () => {
    this.props.history.push("/login")
  }

  showSummary = (cartItems) => {
    return (
      <div className='border rounded rounded-5 pb-5 px-5'>
        <div className="row my-3">
          <h3 className='text-center'>Summary Of Your Order</h3>
          <div className='text-center'>Your Order Has {cartItems.reduce((acc, cur) => cur.qty + acc, 0)} Items</div>
        </div>
        <div className="text-center row bg-secondary text-light fw-bold lead py-2">
          <div className="col-sm-4">Name</div>
          <div className="col-sm-4">Quantity</div>
          <div className="col-sm-4">Value</div>
        </div>
        {
          cartItems.map(item =>
            <div className="text-center row border-bottom py-2">
              <div className="col-sm-4">{item.name}</div>
              <div className="col-sm-4">{item.qty}</div>
              <div className="col-sm-4">Rs. {item.price}</div>
            </div>
          )
        }
      </div>
    )
  }

  render() {
    let { cartItems, user } = this.props;
    return (
      <div className="container">
        <div className="row"><Ad /></div>
        {
          user?.username ? (
            <>
              <div className="row">
                {this.showSummary(cartItems)}
              </div>
              <div className="row my-5">
                <DeliveryDetails cartItems={cartItems} />
              </div>
            </>
          ) : (this.redirectToLogin())
        }
      </div>
    )
  }
}
