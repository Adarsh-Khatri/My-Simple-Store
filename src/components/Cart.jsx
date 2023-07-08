import React, { Component } from 'react';
import { getApi } from '../services/httpServices';
import Ad from './Ad';

export default class Cart extends Component {

  state = {
    productsArr: []
  }

  fetchData = async () => {
    let productsArr = await getApi(`/products`);
    this.setState({ productsArr })
  }

  componentDidMount() {
    this.fetchData()
  }

  handleCheckOut = () => {
    this.props.history.push('/checkout')
  }

  handleQuantity = (id, qty) => {
    let { cartItems, cartItemsId } = this.props;
    let { productsArr } = this.state;
    let tempCart = [...cartItems];
    let index = tempCart.findIndex(c => c.id === id);
    // Create a new array of products based on productsArr
    let updatedProductsArr = [...productsArr];
    tempCart[index].qty += qty;
    // Adjust the price based on the quantity
    tempCart[index].price = tempCart[index].qty * (+updatedProductsArr.find(c => c.id === (+id)).price);
    if (tempCart[index].qty === 0) {
      tempCart.splice(index, 1);
      cartItemsId.splice(index, 1);
      this.props.onChangeCart(cartItemsId);
    }
    this.props.onChangeCartItems(tempCart);
  }

  cartValueAndCheckOutBtn = (cartItems) => {
    return (
      <div className="row p-0 my-3">
        <div className='col-sm-3'>Cart Value: Rs. {cartItems.reduce((acc, cur) => cur.price + acc, 0)}</div>
        <div className='col-sm-2 ms-auto text-end'><button className='btn btn-primary' onClick={() => this.handleCheckOut()}>Check Out</button></div>
      </div>
    )
  }

  showCheckOutProducts = (cartItems) => {
    return (
      <>
        <div className="row py-2 bg-dark text-light lead fw-bold text-center">
          <div className="col-sm-2"></div>
          <div className="col-sm-6 text-start">Product Details</div>
          <div className="col-sm-2">Quantity</div>
          <div className="col-sm-2">Price</div>
        </div>
        {
          cartItems.map(c =>
            <div className="row bg-light lead border">
              <div className="col-sm-2 d-flex align-items-center"><img src={c.imgLink} className="cart-img-top rounded shadow" alt="product image" /></div>
              <div className="col-sm-6 d-flex flex-column justify-content-center">
                <div>{c.name}</div>
                <div>{c.category}</div>
                <div className='text-truncate'>{c.description}</div>
              </div>
              <div className="col-sm-2 d-flex gap-2 justify-content-center align-items-center"><button className='btn btn-success' onClick={() => this.handleQuantity(c.id, +1)}>+</button> {c.qty} <button className='btn btn-warning' onClick={() => this.handleQuantity(c.id, -1)}>-</button></div>
              <div className="col-sm-2 text-center d-flex justify-content-center align-items-center">Rs. {c.price}</div>
            </div>
          )
        }
      </>
    )
  }

  render() {
    let { cartItems } = this.props;
    return (
      <div className="container">
        <div className="row"><Ad /></div>
        <div className="row">
          <h3 className='alert alert-warning text-center fw-bold' role='alert'>You Have {cartItems.reduce((acc, cur) => cur.qty + acc, 0)} Items In Your Cart</h3>
        </div>
        <div className="row">{this.cartValueAndCheckOutBtn(cartItems)}</div>
        <div className="row">{this.showCheckOutProducts(cartItems)}</div>
      </div>
    )
  }
}
