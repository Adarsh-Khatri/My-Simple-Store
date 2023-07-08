import React, { Component } from 'react';
import { getApi } from '../services/httpServices';
import { Link } from 'react-router-dom';

export default class ManageProducts extends Component {

  state = {
    productsArr: [], searchText: ''
  }

  fetchData = async () => {
    let productsArr = await getApi(`/products`);
    this.setState({ productsArr })
  }

  componentDidMount() {
    this.fetchData()
  }

  handleChange = ({ target }) => {
    let { value } = target;
    this.setState({ searchText: value })
  }

  filterProducts = (text) => {
    let { productsArr } = this.state;
    let filererdProducts = productsArr.filter(p => p.name.toLowerCase().includes(text.toLowerCase()))
    return filererdProducts;
  }

  makeSearchField = (name, value) => {
    return (
      <div className="row">
        <input type="search" className='form-control' name={name} value={value} placeholder='Search...' onChange={this.handleChange} />
      </div>
    )
  }

  showProductsTable = (filteredProducts) => {
    return (
      <div className='row my-5'>
        <div className="row"><div>Showing Products {filteredProducts.length > 0 ? 1 : 0} - {filteredProducts.length}</div></div>
        <div className="row bg-dark text-light fw-bold lead py-1 m-0">
          <div className="col-sm-1">#</div>
          <div className="col-sm-3">Title</div>
          <div className="col-sm-3">Category</div>
          <div className="col-sm-2">Price</div>
          <div className="col-sm-3"></div>
        </div>
        {
          filteredProducts.map(p =>
            <div className="row p-0 m-0">
              <div className="col-sm-1 border">{p.id}</div>
              <div className="col-sm-3 border">{p.name}</div>
              <div className="col-sm-3 border">{p.category}</div>
              <div className="col-sm-2 border">{p.price}</div>
              <div className="col-sm-3 border d-flex justify-content-around">
                <div>
                  <Link className="btn btn-warning btn-sm" to={`/product/edit/${p.id}`}>Edit</Link>
                </div>
                <div>
                  <Link className="btn btn-danger btn-sm" to={`/product/delete/${p.id}`}>Delete</Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }


  render() {
    let { productsArr, searchText } = this.state;
    let filteredProducts = this.filterProducts(searchText);
    return (
      <div className="container">
        <div className="row">
          <div className='my-3'>
            <Link className="btn btn-success" to="/product/add">Add A Product</Link>
          </div>
        </div>
        <div className="row">{this.makeSearchField('searchText', searchText)}</div>
        <div className="row ">
          {this.showProductsTable(filteredProducts)}
        </div>
      </div>
    )
  }
}
