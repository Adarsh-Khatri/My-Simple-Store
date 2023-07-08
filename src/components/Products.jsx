import React, { Component } from 'react'
import LeftPanel from './LeftPanel'
import { getApi } from '../services/httpServices';
import Ad from './Ad';


export default class Products extends Component {

  state = {
    productsArr: []
  }

  fetchData = async () => {
    console.log('mounting');
    let { category } = this.props.match.params;
    let productsArr = category ? await getApi(`/products/${category}`) : await getApi(`/products`);
    this.setState({ productsArr })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(preProps, preState) {
    if (preProps != this.props)
      this.fetchData()
  }

  populatingCartByItems = (cartItemsId) => {
    let { productsArr } = this.state;
    let cartItems = [...cartItemsId];
    cartItems = cartItems.map(itemId => {
      let product = productsArr.find(p => p.id === itemId);
      if (product) {
        // Create a new object with the same properties as 'product'
        let newProduct = { ...product };
        newProduct.qty = 1;
        return newProduct;
      }
      return null;
    }).filter(Boolean);

    this.setState({ productsArr });
    this.props.onChangeCartItems(cartItems);
  }


  handleAddToCart = (id) => {
    let { cartArr } = this.props;
    let index = cartArr.indexOf(id);
    if (index >= 0) {
      cartArr.splice(index, 1)
    } else {
      cartArr.push(id);
    }
    this.populatingCartByItems(cartArr)
    this.props.onChangeCart(cartArr)
  }


  showAllProducts = (arr, cartArr) => {
    return (
      <>
        {
          arr.length > 0 ? (
            <div className="row">
              {
                arr.map(a =>
                  <div className="col-sm-4 mb-4">
                    <div className="card shadow p-0 m-0">
                      <img src={a.imgLink} className="card-img-top" alt="product image" />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{a.name}</h5>
                        <p className="card-text">
                          <div>Rs. {a.price}</div>
                          <div className='text-truncate'>{a.description}</div>
                        </p>
                        {
                          cartArr.includes(a.id) ? (
                            <button className='btn btn-warning w-100' onClick={() => this.handleAddToCart(a.id)}>Remove From Cart</button>
                          ) : (
                            <button className='btn btn-success w-100' onClick={() => this.handleAddToCart(a.id)}>Add To Cart</button>
                          )
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          ) : (
            <h3 className='alert alert-success text-center fw-bold mt-5'>NO PRODUCTS FOUND</h3>
          )
        }
      </>
    )
  }

  render() {
    let { productsArr } = this.state;
    let { cartArr } = this.props;
    return (
      <>
        <div className="container">
          <div className="row"><Ad /></div>
          <div className="row">
            <div className="col-sm-3"><LeftPanel /></div>
            <div className="col-sm-9">{this.showAllProducts(productsArr, cartArr)}</div>
          </div>
        </div>
      </>
    )
  }
}
