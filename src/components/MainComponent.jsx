import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Ad from './Ad';
import Products from './Products';
import Cart from './Cart';
import CheckOutProduct from './CheckOutProduct';
import MyOrders from './MyOrders';
import ManageProducts from './ManageProducts';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import Login from './Login';
import Logout from './Logout';
import OrderPlaced from './OrderPlaced';
import { getUser } from '../services/authServices';



export default class MainComponent extends Component {

  state = {
    cartItemsId: [],
    cartItems: []
  }

  handleChange = (arr) => {
    this.setState({ cartItemsId: arr })
  }

  handleCartItems = (arr) => {
    this.setState({ cartItems: arr })
  }

  render() {
    let user = getUser()
    let { cartItemsId, cartItems } = this.state;
    return (
      <div className="container-fluid">
        <Navbar cartItems={cartItems} user={user} />
        <Switch>

          <Route path="/products/:category?" render={props => <Products {...props} onChangeCartItems={this.handleCartItems} onChangeCart={this.handleChange} cartArr={cartItemsId} />} />

          <Route path="/cart" render={props => <Cart {...props} onChangeCartItems={this.handleCartItems} onChangeCart={this.handleChange} cartItemsId={cartItemsId} cartItems={cartItems} />} />

          <Route path="/checkout" render={props => <CheckOutProduct {...props} user={user} onChangeCartItems={this.handleCartItems} cartItems={cartItems} />} />

          <Route path="/myorders" component={MyOrders} />

          <Route path="/manageproducts" component={ManageProducts} />

          <Route path="/product/add" component={AddProduct} />

          <Route path="/product/edit/:id" component={EditProduct} />

          <Route path="/product/delete/:id" component={DeleteProduct} />


          <Route path="/logout" component={Logout} />

          <Route path="/orderplaced" render={props => <OrderPlaced {...props} onChangeCartItems={this.handleCartItems} onChangeCart={this.handleChange} />} />

          <Route path="/login" component={Login} />

          <Redirect to="/products" />

        </Switch>

      </div>
    )
  }
}
