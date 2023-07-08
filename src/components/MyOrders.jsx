import React, { Component } from 'react';
import { getApi } from '../services/httpServices';
import Ad from './Ad';

export default class MyOrders extends Component {

  state = {
    ordersArr: []
  }

  fetchData = async () => {
    let ordersArr = await getApi(`/orders`);
    this.setState({ ordersArr })
  }

  componentDidMount() {
    this.fetchData()
  }

  showOrderTable = (ordersArr) => {
    return (
      <>
        <div className="row bg-dark text-light lead fw-bold py-2">
          <div className="col-sm-2">Name</div>
          <div className="col-sm-2">City</div>
          <div className="col-sm-5">Address</div>
          <div className="col-sm-2">Amount</div>
          <div className="col-sm-1">Items</div>
        </div>
        {
          ordersArr.map(o =>
            <div className="row border">
              <div className="col-sm-2">{o.name}</div>
              <div className="col-sm-2">{o.city}</div>
              <div className="col-sm-5">{o.address}</div>
              <div className="col-sm-2">{o.amount}</div>
              <div className="col-sm-1">{o.items}</div>
            </div>
          )
        }
      </>
    )
  }

  render() {
    let { ordersArr } = this.state;
    return (
      <div className="container">
        <div className="row"><Ad /></div>
        <div className="row">
          <h1 className='text-center fw-bold'>List Of All Orders</h1>
        </div>
        <div className="row">
          {this.showOrderTable(ordersArr)}
        </div>
      </div>
    )
  }
}
